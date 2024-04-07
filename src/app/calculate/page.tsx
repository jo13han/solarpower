"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useAppSelector } from "@/components/reduxHooks";
export default function Bescom() {
  const [energy, setEnergy] = useState<number | null>(null);
  const [submit, setSubmit] = useState<boolean>(false);

  const processedArea = useAppSelector((state) => state.uislice.processedArea);
  const SI = useAppSelector((state) => state.uislice.currentSolar);

  function calculateElectricityBill(consumption_kwh: number) {
    let fixed_charges = 0;
    let energy_charges = 0;

    // Calculate fixed charges
    if (consumption_kwh <= 50) {
      fixed_charges = 120 * consumption_kwh;
    } else {
      fixed_charges = 120 * 50 + 210 * (consumption_kwh - 50);
    }

    // Calculate energy charges
    if (consumption_kwh > 200) {
      energy_charges = 590 * consumption_kwh;
    } else {
      energy_charges = 0;
    }

    let total_bill = fixed_charges + energy_charges;
    return total_bill / 100; // Convert paise to rupees
  }

  return (
    <>
      {energy && submit ? (
        <div className={styles.container2}>
          <div className={styles.title}>Your total bill for your input units and after installing solar</div>
          <div className={styles.toprow}>
            <div className={styles.cardSmall}>
              <div className={styles.title2}>Total Energy Generated in KWh</div>
              {processedArea ? `${(processedArea * 0.3 * SI).toFixed(2)} (KWh)` : "Loading..."}
            </div>
            <div className={styles.cardSmall}>
              <div className={styles.title2}>Total Cost of energy generated</div>
              {processedArea
                ? `${calculateElectricityBill(processedArea * 0.3 * SI).toFixed(2)} (rupees)`
                : "Loading..."}
            </div>
            <div className={styles.cardSmall}>
              <div className={styles.title2}>Total Savings</div>
              {processedArea
                ? `${(calculateElectricityBill(processedArea * 0.3 * SI) - calculateElectricityBill(energy)).toFixed(
                    2
                  )} (rupees)`
                : "Loading..."}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.top}>Enter average number of units consumed (KWh)</div>
          <span className={styles.subText}>
            Enter average number of units of energy consumed by a household every month in KWh
          </span>
          <input
            value={energy ? energy : undefined}
            onChange={(e: any) => setEnergy(e.target.value)}
            className={styles.bescomInput}
            placeholder="Enter number of units in Kwh..."
          />
          <button onClick={() => (energy ? setSubmit(true) : null)} className={styles.submit}>
            Submit
          </button>
        </div>
      )}
    </>
  );
}
