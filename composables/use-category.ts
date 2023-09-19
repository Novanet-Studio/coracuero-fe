import { categories as categoriesQuery } from '~/graphql';
import type { Ref } from 'vue';

interface Params {
  ordered?: boolean;
}

interface Result {
  categories: Ref<CategoriesMapped[]>;
  categoriesResult: Ref<CategoriesMapped[]>;
  categoryActive: Ref<string>;
  isLoading: Ref<boolean>;
  filterByCategory: (categoryId: string, selector?: string) => void;
  removeFilters: () => void;
}

export default function useCategory(params?: Params): Result {
  const categories = useState<CategoriesMapped[]>('categories', () => []);
  const categoriesResult = useState<CategoriesMapped[]>(
    'categoriesResult',
    () => []
  );
  const categoryActive = useState('categoryActive', () => '');
  const isLoading = useState<boolean>('isCategoriesLoading', () => false);

  const graphql = useStrapiGraphQL();
  const { $notify } = useNuxtApp();

  const getCategories = async () => {
    try {
      isLoading.value = true;
      const response = await graphql<CategoriesRequest>(categoriesQuery);

      if (params?.ordered) {
        const ordered = response.data.categories.data.sort(
          (a: CategoriesData, b: CategoriesData) => Number(a.id) - Number(b.id)
        );
        categories.value = mapperData<CategoriesMapped[]>(ordered);
        categoriesResult.value = mapperData<CategoriesMapped[]>(ordered);
        return;
      }

      categories.value = mapperData(response.data.categories.data);
      categoriesResult.value = mapperData(response.data.categories.data);
    } catch (error) {
      console.log(error);
      $notify({
        group: '',
        title: 'Error',
        text: 'Hubo un error al intentar cargar las categorias',
      });
      categories.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const filterByCategory = (categoryId: string, selector = '') => {
    categoryActive.value = categoryId;
    categoriesResult.value = categories.value.filter(
      (category) => category.id === categoryId
    );

    if (!selector) return;

    setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({
        behavior: 'smooth',
      });
    }, 1000);
  };

  const removeFilters = () => {
    categoryActive.value = '';
    categoriesResult.value = categories.value;
    // getCategories();
  };

  onMounted(() => {
    getCategories();
  });

  return {
    categories,
    categoryActive,
    categoriesResult,
    isLoading,
    filterByCategory,
    removeFilters,
  };
}
