"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Date() {
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("0"); // Default tidak ada bulan
  const [selectedYear, setSelectedYear] = useState<string>("0"); // Default tidak ada tahun
  const [selectedStatus, setSelectedStatus] = useState<string>("unknown"); // Default status tidak diketahui

  interface Params {
    year?: string;
    month?: string;
  }
  // Fungsi untuk mengambil data dari API
  const getDate = async (month: string, year: string) => {
    let url = `https://dayoffapi.vercel.app/api`;
    const params: Params = {};

    if (year !== "0") params.year = year;
    if (month !== "0") params.month = month;

    try {
      const response = await axios.get(url, { params });
      return response.data;
    } catch (err: any) {
      throw new Error(
        err.response?.data?.message || "Terjadi kesalahan saat mengambil data"
      );
    }
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (dateString: string): string => {
    const [year, month, day] = dateString.split("-");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const monthName = monthNames[parseInt(month, 10) - 1];
    return `${day} ${monthName} ${year}`;
  };

  // Efek untuk mengambil data setiap kali filter berubah
  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getDate(selectedMonth, selectedYear);
      const filteredData = responseData.filter((item: { is_cuti: boolean }) => {
        if (selectedStatus === "true") return item.is_cuti === true;
        if (selectedStatus === "false") return item.is_cuti === false;
        return true; // Jika status unknown, tampilkan semua
      });
      setData(filteredData);
    };
    fetchData();
  }, [selectedMonth, selectedYear, selectedStatus]);

  return (
    <div className="p-[20px]">
      <h1 className="text-[26px] font-[800] text-center">
        Tanggal <span className="text-red-500">Spesial</span> Indonesia{" "}
        {selectedYear !== "0" ? selectedYear : ""}
      </h1>
      <p className="text-center mb-3 font-semibold">
        Warna <span className="text-red-500">Merah</span>: Libur, Warna Hitam:
        Cuti
      </p>

      {/* Dropdown untuk filter */}
      <div className="flex gap-5">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="0">Semua Bulan</option>
          <option value="1">Januari</option>
          <option value="2">Februari</option>
          <option value="3">Maret</option>
          <option value="4">April</option>
          <option value="5">Mei</option>
          <option value="6">Juni</option>
          <option value="7">Juli</option>
          <option value="8">Agustus</option>
          <option value="9">September</option>
          <option value="10">Oktober</option>
          <option value="11">November</option>
          <option value="12">Desember</option>
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="0">Tahun Sekarang</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="unknown">Semua Jenis</option>
          <option value="false">Libur</option>
          <option value="true">Cuti</option>
        </select>
      </div>

      {/* Tampilkan data */}
      <ul className="flex flex-col gap-5 mt-5">
        {data.map(
          (
            item: { tanggal: string; keterangan: string; is_cuti: boolean },
            index: number
          ) => (
            <li key={index}>
              <h1 className="flex flex-col font-bold text-[20px]">
                {formatDate(item.tanggal)}
                <span
                  className={`ps-[20px] text-[12px] font-normal ${
                    item.is_cuti ? "text-black" : "text-red-500"
                  }`}
                >
                  {item.keterangan}
                </span>
              </h1>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
