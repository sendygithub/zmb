"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Music2, Flame, Users2 } from "lucide-react";

const BAR_COUNT = 24;

export default function BrandPanel() {
  return (
    <div className="relative lg:w-[46%] bg-[#14120E] text-white overflow-hidden flex flex-col">
      {/* glow blobs */}
      <div className="absolute -top-32 -left-24 w-72 h-72 bg-[#AFFF00]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-[#FF4D6D]/10 rounded-full blur-3xl" />

      <div className="relative z-10 px-8 lg:px-12 pt-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <span className="text-xl font-black tracking-tight">
            <span className="text-white">Terong</span>
            <span className="text-[#AFFF00]">Zumba</span>
          </span>
        </Link>
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 lg:px-12 py-12">
        {/* Signature: equalizer pulse */}
        <div className="flex items-end gap-[3px] h-16 mb-8" aria-hidden="true">
          {Array.from({ length: BAR_COUNT }).map((_, i) => (
            <motion.span
              key={i}
              className="w-[5px] rounded-full"
              style={{
                background: i % 5 === 0 ? "#FF4D6D" : "#AFFF00",
              }}
              animate={{
                height: ["18%", "90%", "35%", "70%", "18%"],
              }}
              transition={{
                duration: 1.4 + (i % 5) * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (i % 8) * 0.08,
              }}
            />
          ))}
        </div>

        <h1 className="text-3xl lg:text-[2.5rem] font-black tracking-tight leading-[1.05] mb-4">
          Musik nyala,
          <br />
          badan ikut bergerak.
        </h1>
        <p className="text-white/50 font-mono text-sm leading-relaxed max-w-sm mb-10">
          Masuk buat lihat jadwal kelas, cek progres kehadiran, dan gabung
          komunitas yang gerak bareng tiap minggu.
        </p>

        <div className="space-y-4 max-w-sm">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Music2 className="w-4 h-4 text-[#AFFF00]" />
            </div>
            <p className="text-sm text-white/70">
              <span className="font-bold text-white">40+ kelas</span> per
              minggu, playlist ganti tiap sesi
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Flame className="w-4 h-4 text-[#FF4D6D]" />
            </div>
            <p className="text-sm text-white/70">
              Instruktor bersertifikasi, intensitas dari santai sampai sweat
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center shrink-0">
              <Users2 className="w-4 h-4 text-[#AFFF00]" />
            </div>
            <p className="text-sm text-white/70">
              Komunitas aktif, absen bareng temen satu studio
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
