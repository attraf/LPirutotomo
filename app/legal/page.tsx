"use client";

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
    pageTitle: "특정 상거래법에 기반한 표기",
    content: `
      <h2 class="text-xl font-bold mb-4">특정 상거래법에 기반한 표기</h2>
      
      <div class="space-y-4">
        <div>
          <p class="font-bold">판매업자:</p>
          <p>IRUTOMO</p>
        </div>
        
        <div>
          <p class="font-bold">대표자:</p>
          <p>專齊夏暉</p>
        </div>
        
        <div>
          <p class="font-bold">소재지/주소:</p>
          <p>大阪府吹田市江坂町２丁目１−６４</p>
        </div>
        
        <div>
          <p class="font-bold">고객센터 번호:</p>
          <p>050-7121-1998</p>
        </div>
        
        <div>
          <p class="font-bold">고객센터 접수시간:</p>
          <p>10:00~19:00</p>
        </div>
        
        <div>
          <p class="font-bold">이메일 주소:</p>
          <p>gespokrofficial@gmail.com</p>
        </div>
        
        <div>
          <p class="font-bold">홈페이지 URL:</p>
          <p>https://irutomops.studio.site</p>
        </div>
        
        <div>
          <p class="font-bold">지불 방법:</p>
          <p>신용카드</p>
        </div>
        
        <div>
          <p class="font-bold">지불 시기/기한:</p>
          <ul class="list-disc list-inside ml-4">
            <li>신용카드: 즉시</li>
            <li>편의점: 주문 후 7일 이내</li>
          </ul>
        </div>
        
        <div>
          <p class="font-bold">인도 시기:</p>
          <p>예약일에 서비스를 제공합니다.</p>
        </div>
        
        <div>
          <p class="mt-4">구매 시, 예약 확정 후 이메일과 마이페이지를 통해 예약 내용 및 바우처(해당하는 경우)를 확인할 수 있습니다.</p>
        </div>
      </div>
    `
  },
  ja: {
    pageTitle: "特定商取引法に基づく表記",
    content: `
      <h2 class="text-xl font-bold mb-4">特定商取引法に基づく表記</h2>
      
      <div class="space-y-4">
        <div>
          <p class="font-bold">販売業者:</p>
          <p>IRUTOMO</p>
        </div>
        
        <div>
          <p class="font-bold">代表者:</p>
          <p>專齊夏暉</p>
        </div>
        
        <div>
          <p class="font-bold">所在地/住所:</p>
          <p>大阪府吹田市江坂町２丁目１−６４</p>
        </div>
        
        <div>
          <p class="font-bold">カスタマーセンター番号:</p>
          <p>050-7121-1998</p>
        </div>
        
        <div>
          <p class="font-bold">カスタマーセンター受付時間:</p>
          <p>10:00~19:00</p>
        </div>
        
        <div>
          <p class="font-bold">メールアドレス:</p>
          <p>gespokrofficial@gmail.com</p>
        </div>
        
        <div>
          <p class="font-bold">ホームページURL:</p>
          <p>https://irutomops.studio.site</p>
        </div>
        
        <div>
          <p class="font-bold">支払方法:</p>
          <p>クレジットカード</p>
        </div>
        
        <div>
          <p class="font-bold">支払時期/期限:</p>
          <ul class="list-disc list-inside ml-4">
            <li>クレジットカード: 即時</li>
            <li>コンビニエンスストア: 注文後7日以内</li>
          </ul>
        </div>
        
        <div>
          <p class="font-bold">引き渡し時期:</p>
          <p>予約日にサービスを提供します。</p>
        </div>
        
        <div>
          <p class="mt-4">購入時、予約確定後にメールとマイページを通じて予約内容およびバウチャー（該当する場合）を確認できます。</p>
        </div>
      </div>
    `
  }
};

export default function Legal() {
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

      <div className="p-4">
        <Card className="p-6 bg-white/50">
          <div 
            className="prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: t.content }}
          />
        </Card>
      </div>
    </main>
  );
}
