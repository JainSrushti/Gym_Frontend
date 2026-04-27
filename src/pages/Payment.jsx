

import { useState } from "react";

import PaymentIntro from "../components/payment/PaymentIntro.jsx";
import MembershipPayment from "../components/payment/MembershipPayment.jsx";
import ProgramPayment from "../components/payment/ProgramPayment.jsx";
import TrainerPayment from "../components/payment/TrainerPayment.jsx";
import PaymentHistory from "../components/payment/PaymentHistory.jsx";

function Payment() {
    return (
        <div
            style={{
                background: "#000",
                minHeight: "100vh",
                width: "100%",
                padding: "0",
                margin: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <div style={{ width: "100%", maxWidth: "900px", padding: "2rem 1rem 0 1rem" }}>
                <PaymentIntro />
            </div>
            <div style={{ width: "100%", maxWidth: "900px", padding: "2rem 1rem 0 1rem" }}>
                <MembershipPayment />
            </div>
            <div style={{ width: "100%", maxWidth: "900px", padding: "2rem 1rem 0 1rem" }}>
                <ProgramPayment />
            </div>
            <div style={{ width: "100%", maxWidth: "900px", padding: "2rem 1rem 0 1rem" }}>
                <TrainerPayment />
            </div>
            <div style={{ width: "100%", maxWidth: "900px", padding: "2rem 1rem 2rem 1rem" }}>
                <PaymentHistory />
            </div>
        </div>
    );
}

export default Payment;