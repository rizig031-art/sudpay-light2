import { useState } from "react";
import { useStore } from "../store/useStore";
import { motion } from "framer-motion";

export default function ElectricityModal({ onClose }) {
  const [meter, setMeter] = useState("");
  const [amount, setAmount] = useState("");
  const { addTransaction, selectedBank } = useStore();

  const handlePayment = () => {
    if (!meter || !amount) return alert("Please fill all fields");
    addTransaction({
      id: Date.now(),
      type: "Payment",
      amount: parseInt(amount),
      bank: selectedBank,
      date: new Date().toLocaleString(),
    });
    alert(`Paid ${amount} SDG for electricity meter ${meter}`);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="modal-backdrop">
      <div className="modal">
        <h2>Buy Electricity</h2>
        <input value={meter} onChange={(e) => setMeter(e.target.value)} placeholder="Meter Number" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" type="number" />
        <button onClick={handlePayment}>Pay</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </motion.div>
  );
}
