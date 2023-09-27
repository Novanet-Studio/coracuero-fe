import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import corsFn from 'cors';
import sgMail from '@sendgrid/mail';
import { Client, Environment } from 'square';
import { config } from 'vue-email/compiler';
import type {
  CreateCustomerRequest,
  CreatePaymentRequest,
  Customer,
  Payment,
} from 'square';

admin.initializeApp();

const apikey = process.env.SENDGRID_API_KEY as string;
const senderMail = process.env.SENDGRID_SENDER_MAIL as string;
const receiverMail = process.env.SENDGRID_RECEIVER_MAIL as string;

const mail = config('./templates');

const cors = corsFn({ origin: true });
const { customersApi, paymentsApi } = new Client({
  environment: Environment.Sandbox,
  accessToken:
    'EAAAEJyncqd3OPpoDxFbqfbNjmfeDnM_8OZmPxgUfk-ifWbwexuPqMaAUACyfdbs',
});

interface CustomerResponse extends Customer {
  version: bigint;
}

interface PaymentResponse extends Payment {
  version: bigint;
}

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createCustomer = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const data = req.body.data as CreateCustomerRequest;
      const body = {
        idempotencyKey: data.idempotencyKey,
        givenName: data.givenName,
        emailAddress: data.emailAddress,
      };
      const response = await customersApi.createCustomer(body);
      const { version, ...customer } = response.result
        .customer as CustomerResponse;
      res.status(200).send({
        data: customer,
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  });
});

export const payment = functions.https.onRequest((req, res) =>
  cors(req, res, async () => {
    try {
      const data = req.body.data as CreatePaymentRequest;
      const body = {
        idempotencyKey: data.idempotencyKey,
        locationId: data.locationId,
        sourceId: data.sourceId,
        customerId: data.customerId,
        amountMoney: {
          amount: data.amountMoney.amount,
          currency: data.amountMoney.currency,
        },
        buyerEmailAddress: data.buyerEmailAddress,
        shippingAddress: {
          addressLine1: data.shippingAddress?.addressLine1,
          locality: data.shippingAddress?.locality,
          postalCode: data.shippingAddress?.postalCode,
          country: data.shippingAddress?.country,
        },
        billingAddress: {
          addressLine1: data.billingAddress?.addressLine1,
          locality: data.billingAddress?.locality,
          postalCode: data.billingAddress?.postalCode,
          country: data.billingAddress?.country,
        },
        note: data.note,
      };
      const response = await paymentsApi.createPayment(body);
      const parsedResponse = JSON.stringify(response.result, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      const { payment } = JSON.parse(parsedResponse);
      res.status(200).send({ data: payment as PaymentResponse });
    } catch (error) {
      res.status(400).send({ error });
    }
  })
);

export const sendReceiptEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { data } = req.body;

      const template = await mail.render('receipt.vue', {
        props: {
          ...data,
        },
      });

      sgMail.setApiKey(apikey);

      const msg = {
        to: data.email,
        from: senderMail,
        subject: `Fast-Ecommerce recibo de compra ${data.orderId}`,
        text: 'Fast-Ecommerce recibo de compra',
        html: template,
      };

      await sgMail.send(msg);

      return res.status(200).json({
        data: {
          message: 'Email enviado',
          status: 200,
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.body);
      }
      return res.status(400).json({ status: 'ERROR', message: error.message });
    }
  });
});

export const sendMerchantEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // creating sendgrid object request
      sgMail.setApiKey(apikey);

      const { data } = req.body;

      const template = await mail.render('merchant.vue', {
        props: {
          ...data,
        },
      });

      const msg = {
        to: receiverMail,
        from: senderMail,
        subject: `Fast-Ecommerce nueva orden ${data.orderId}`,
        text: 'Fast-Ecommerce nueva orden',
        html: template,
      };

      await sgMail.send(msg);

      return res.status(200).json({
        data: {
          message: 'Email enviado',
          status: 200,
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.body);
      }

      return res.status(400).json({ status: 'ERROR', message: error.message });
    }
  });
});
