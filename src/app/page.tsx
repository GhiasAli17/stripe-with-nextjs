import Payment from '@/app/payment/Payment'
import PaymentSetup from '@/app/setup-intent/PaymentSetup'
import PaymentMethod from '@/app/payment-methods/Payment'
const products: Product[] = [
  {
    id: "1",
    name: "GoPro",
    price: 57,
    quantity: 0,
  },
  {
    id: "2",
    name: "Tripod",
    price: 7.99,
    quantity: 0,
  },
  {
    id: "3",
    name: "Bag",
    price: 4.99,
    quantity: 0,
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <PaymentMethod />
      {/* <Payment />  */}
      {/*<PaymentSetup />*/}
     
    </main>
  );
}
