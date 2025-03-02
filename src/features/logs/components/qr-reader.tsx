"use client";

import { Card } from "@/components/ui/card";
import { useRef, useState } from "react";
import { QrReader } from "react-qr-reader";
import LogForm from "./log-form";
import { getDriver } from "../db/logs";
import { Driver } from "@/types/types";

const QRCodeReader = () => {
  const [driver, setDriver] = useState<Driver | null>(null);
  const canScanRef = useRef(true);

  const fetchDriver = async (id: string) => {
    try {
      const driver = await getDriver(id);
      setDriver(driver);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <Card>
        <QrReader
          onResult={async (result) => {
            if (result && canScanRef.current) {
              canScanRef.current = false;
              const scannedQR = result.getText();
              await fetchDriver(scannedQR);

              setTimeout(() => {
                canScanRef.current = true;
              }, 1000);
            }
          }}
          constraints={{
            facingMode: "environment",
            width: { min: 640, ideal: 1280, max: 1920 },
            height: { min: 480, ideal: 720, max: 1080 },
          }}
          videoId="qr-video"
          className="w-full h-full"
          videoContainerStyle={{
            position: "relative",
            width: "100%",
            minHeight: "300px",
          }}
          videoStyle={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      </Card>
      <LogForm driver={driver} />
    </div>
  );
};

export default QRCodeReader;
