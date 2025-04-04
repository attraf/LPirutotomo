"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// 言語切り替えボタン用のスタイル
const languageButtonStyle = {
  active: {
    opacity: 1,
    transform: "scale(1.2)",
  },
  inactive: {
    opacity: 0.5,
  }
};

// 言語データの定義
const translations = {
  ko: {
    pageTitle: "예약 방법",
    aboutIRUTOMO: {
      title: "IRUTOMO란?",
      description: [
        "IRUTOMO는 한국인을 위한 일본 여행 서비스입니다. 식당 예약 서비스는 일본어를 몰라도, 일본 전화번호가 없어도 쉽게 일본 현지인들에게 인기 있는 일본 레스토랑을 예약할 수 있습니다.",
        "\"일본친구\"라는 의미의 IRUTOMO는 당신의 일본 여행에서 더 일본의 리얼함을 느낄 수 있는 경험을 제공합니다. 식당 예약뿐만 아니라 일본인 친구 가이드에게 일본의 일상을 안내받을 수 있는 가이드 서비스도 제공하고 있습니다.",
        "주요 서비스 지역은 오사카, 교토, 나라, 고베 등 간사이 지역을 중심으로 운영되고 있으며, 점차 도쿄 등 다른 지역으로도 확대될 예정입니다."
      ]
    },
    howToUse: {
      title: "서비스 이용 방법",
      steps: [
        {
          number: "01",
          title: "레스토랑 선택",
          description: "지역, 요리 종류 등으로 원하는 레스토랑을 검색하여 선택하세요.",
          emoji: "🏯"
        },
        {
          number: "02",
          title: "예약 정보 입력",
          description: "날짜, 시간, 인원 수 등 필요한 정보를 입력하세요.",
          emoji: "📝"
        },
        {
          number: "03",
          title: "수수료 지불",
          description: "예약 수수료 ￥1,000을 지불하세요. 이 금액은 레스토랑 이용 요금과는 별도입니다.",
          emoji: "💴"
        },
        {
          number: "04",
          title: "예약 확정",
          description: "당사의 담당자가 레스토랑에 직접 연락하여 예약을 확정합니다. 확정 후 이메일로 알려드립니다.",
          emoji: "📱"
        }
      ]
    }
  },
  ja: {
    pageTitle: "予約方法",
    aboutIRUTOMO: {
      title: "IRUTOMOとは？",
      description: [
        "IRUTOMOは韓国人のための日本旅行サービスです。食堂予約サービスは日本語が分からなくても、日本の電話番号がなくても、簡単に日本現地人から人気のある日本のレストランを予約することができます。",
        "\"日本の友達（일본친구）\"という意味のIRUTOMOは、あなたの日本旅行でより日本のリアルを感じる体験を提供しています。食堂予約だけではなく、日本の友達ガイドに日本の日常を案内してもらえるガイドサービスも提供しています。",
        "主なサービス地域は大阪、京都、奈良、神戸など関西地域を中心に運営されており、徐々に東京などの他の地域にも拡大する予定です。"
      ]
    },
    howToUse: {
      title: "サービス利用方法",
      steps: [
        {
          number: "01",
          title: "レストラン選択",
          description: "地域、料理の種類などで希望のレストランを検索して選択してください。",
          emoji: "🏯"
        },
        {
          number: "02",
          title: "予約情報入力",
          description: "日付、時間、人数など必要な情報を入力してください。",
          emoji: "📝"
        },
        {
          number: "03",
          title: "手数料のお支払い",
          description: "予約手数料￥1,000をお支払いください。この金額はレストランの利用料金とは別です。",
          emoji: "💴"
        },
        {
          number: "04",
          title: "予約確定",
          description: "当社の担当者がレストランに直接連絡し、予約を確定します。確定後、メールでお知らせします。",
          emoji: "📱"
        }
      ]
    }
  }
};

export default function HowToUse() {
  // 言語コンテキストから言語設定を取得
  const { language, setLanguage } = useLanguage();
  
  // 現在の言語のテキストを取得
  const t = translations[language];

  return (
    <main className="max-w-md mx-auto bg-[#F8F8F8] min-h-screen pb-20">
      {/* ヘッダー */}
      <header className="flex items-center p-4 bg-white sticky top-0 z-50 shadow-custom">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6 text-gray-600" />
        </Link>
        <h1 className="text-xl font-bold text-[#FFA500]">{t.pageTitle}</h1>
        <div className="ml-auto flex items-center">
          {/* 言語切り替えボタン */}
          <button 
            onClick={() => setLanguage("ko")} 
            className={`language-button mr-2 ${language === "ko" ? "active" : ""}`}
            aria-label="한국어로 전환"
            style={language === "ko" ? languageButtonStyle.active : languageButtonStyle.inactive}
          >
            <span className="text-xl">🇰🇷</span>
          </button>
          <button 
            onClick={() => setLanguage("ja")} 
            className={`language-button ${language === "ja" ? "active" : ""}`}
            aria-label="日本語に切り替え"
            style={language === "ja" ? languageButtonStyle.active : languageButtonStyle.inactive}
          >
            <span className="text-xl">🇯🇵</span>
          </button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* About IRUTOMO */}
        <Card className="p-6 bg-[#E64DFF] text-white rounded-3xl">
          <h2 className="text-xl font-bold mb-4">{t.aboutIRUTOMO.title}</h2>
          <div className="space-y-4 text-sm leading-relaxed">
            {t.aboutIRUTOMO.description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </Card>

        {/* How to Use */}
        <section>
          <h2 className="text-xl font-bold mb-4">{t.howToUse.title}</h2>
          <div className="space-y-4">
            {t.howToUse.steps.map((step, index) => (
              <Card key={index} className="p-4 bg-white/50">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#E64DFF] rounded-full flex items-center justify-center text-white font-bold">
                    {step.number}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{step.emoji}</span>
                      <h3 className="font-bold">{step.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
