"use client";

import { useState } from "react";
import { Bell, MapPin, Phone, Calendar, Clock, Star, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 言語データの定義
const translations = {
  ko: {
    siteName: "한국 맛집 예약",
    hero: {
      title: "현지 일본인들이 사랑하는 식당을 쉽게 예약하세요",
      subtitle: "전화 예약만 가능한 인기 식당도 저희에게 맡겨주세요!",
      cta: "지금 예약하기"
    },
    categories: [
      { icon: "🍜", name: "인기 식당" },
      { icon: "📱", name: "예약 방법" },
      { icon: "🗺️", name: "지역" },
      { icon: "💬", name: "통역" },
      { icon: "❓", name: "FAQ" },
    ],
    popularRestaurants: "인기 식당",
    viewMore: "더보기",
    popular: "인기",
    book: "예약하기",
    services: {
      title: "서비스",
      phone: {
        title: "전화 예약 대행",
        desc: "일본어가 통하지 않는 인기 식당도 예약 가능"
      },
      easy: {
        title: "간편한 예약",
        desc: "24시간 언제든지 예약 요청 가능"
      },
      quick: {
        title: "신속한 대응",
        desc: "예약 확정 후 바로 연락 드립니다"
      }
    },
    testimonials: {
      title: "고객 후기",
    },
    cta: {
      title: "지금 한국 맛집을 경험해보세요!",
      desc: "24시간 언제든지 예약 요청 가능. 전화 예약만 가능한 인기 식당도 저희에게 맡겨주세요.",
      button: "예약하기"
    },
    footer: {
      desc: "한국의 맛있는 음식을 일본어로 쉽게 예약하세요.\n전화 예약만 가능한 식당도 저희에게 맡겨주세요.",
      rights: " 2025 한국 맛집 예약 All Rights Reserved."
    }
  },
  ja: {
    siteName: "韓国グルメ予約",
    hero: {
      title: "現地日本人から人気の食堂を簡単予約",
      subtitle: "電話予約のみの人気店も私たちにお任せください！",
      cta: "いますぐ予約する"
    },
    categories: [
      { icon: "🍜", name: "人気店舗" },
      { icon: "📱", name: "予約方法" },
      { icon: "🗺️", name: "エリア" },
      { icon: "💬", name: "通訳" },
      { icon: "❓", name: "FAQ" },
    ],
    popularRestaurants: "人気店舗",
    viewMore: "もっと見る",
    popular: "人気店",
    book: "予約する",
    services: {
      title: "私たちのサービス",
      phone: {
        title: "電話予約代行",
        desc: "日本語が通じない人気店も予約可能"
      },
      easy: {
        title: "簡単予約",
        desc: "24時間いつでも予約リクエスト可能"
      },
      quick: {
        title: "迅速な対応",
        desc: "予約確定後すぐにご連絡いたします"
      }
    },
    testimonials: {
      title: "お客様の声",
    },
    cta: {
      title: "いますぐ韓国グルメを体験しよう！",
      desc: "24時間いつでも予約リクエスト可能。電話予約のみの人気店舗も私たちにお任せください。",
      button: "予約する"
    },
    footer: {
      desc: "韓国の美味しいグルメを日本語でカンタン予約。\n電話予約のみのお店も私たちにお任せください。",
      rights: " 2025 韓国グルメ予約 All Rights Reserved."
    }
  }
};

// レストランデータ
const restaurants = [
  {
    name: {
      ko: "명동 칼국수",
      ja: "明洞カルグクス"
    },
    area: {
      ko: "명동",
      ja: "明洞"
    },
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400",
    tags: {
      ko: ["한식", "칼국수"],
      ja: ["韓国料理", "カルグクス"]
    },
    popular: true
  },
  {
    name: {
      ko: "토속촌 삼계탕",
      ja: "土俗村参鶏湯"
    },
    area: {
      ko: "종로3가",
      ja: "鐘路3街"
    },
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=400",
    tags: {
      ko: ["삼계탕", "한식"],
      ja: ["参鶏湯", "韓国料理"]
    },
    popular: true
  },
  {
    name: {
      ko: "원할머니 삼계탕",
      ja: "ウォンハルメサムゲタン"
    },
    area: {
      ko: "동대문",
      ja: "東大門"
    },
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1635886840360-a2d27a5826d0?auto=format&fit=crop&w=400",
    tags: {
      ko: ["삼계탕", "한식"],
      ja: ["参鶏湯", "韓国料理"]
    }
  }
];

// お客様の声データ
const testimonials = [
  {
    text: {
      ko: "전화 예약이 어려웠던 인기 식당에 갈 수 있어서 대만족!",
      ja: "電話予約が難しかった人気店に行けて大満足！"
    },
    name: {
      ko: "타나카 씨",
      ja: "田中さん"
    },
    location: {
      ko: "도쿄",
      ja: "東京"
    },
    rating: 5
  },
  {
    text: {
      ko: "통역 지원이 있어서 안심하고 식사할 수 있었습니다",
      ja: "通訳サポートがあって安心して食事ができました"
    },
    name: {
      ko: "사토 씨",
      ja: "佐藤さん"
    },
    location: {
      ko: "오사카",
      ja: "大阪"
    },
    rating: 5
  }
];

export default function Home() {
  // 言語切り替え用のステート（デフォルトは韓国語）
  const [language, setLanguage] = useState<"ko" | "ja">("ko");
  
  // 翻訳データの取得
  const t = translations[language];

  return (
    <main className="max-w-md mx-auto bg-[#F8F8F8] min-h-screen pb-20">
      {/* ヘッダー - 言語切り替えボタンを追加 */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 shadow-custom">
        <div className="flex items-center">
          <span className="text-2xl mr-2">🍽️</span>
          <h1 className="text-xl font-bold text-[#00CBB3]">{t.siteName}</h1>
        </div>
        <div className="flex items-center">
          {/* 言語切り替えボタン */}
          <button 
            onClick={() => setLanguage("ko")} 
            className={`language-button mr-2 ${language === "ko" ? "active" : ""}`}
            aria-label="한국어로 전환"
          >
            <span className="text-xl">🇰🇷</span>
          </button>
          <button 
            onClick={() => setLanguage("ja")} 
            className={`language-button mr-4 ${language === "ja" ? "active" : ""}`}
            aria-label="日本語に切り替え"
          >
            <span className="text-xl">🇯🇵</span>
          </button>
          <Bell className="h-6 w-6 text-gray-600" />
        </div>
      </header>

      {/* ヒーローバナー */}
      <div className="p-6 bg-gradient-to-br from-[#00CBB3] to-[#FFA500] rounded-2xl mx-4 my-6 text-white shadow-custom">
        <div className="flex items-center mb-4">
          <span className="text-4xl mr-3">🇰🇷</span>
          <h2 className="text-2xl font-bold">
            {t.hero.title.split('\n').map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </h2>
        </div>
        <p className="text-sm opacity-90 mb-4">{t.hero.subtitle}</p>
        <Button className="w-full bg-white text-[#00CBB3] hover:bg-white/90 font-bold py-3 rounded-xl hover-scale">
          {t.hero.cta}
        </Button>
      </div>

      {/* カテゴリー */}
      <div className="grid grid-cols-5 gap-3 px-4 mb-8">
        {t.categories.map((category, i) => (
          <button key={i} className="text-center focus:outline-none">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-custom hover:bg-[#00CBB3]/10 transition-colors hover-scale">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-xs font-medium">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="section-divider mx-4" />

      {/* 人気店舗 */}
      <section className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold flex items-center">
            <span className="text-xl mr-2">🔥</span>
            {t.popularRestaurants}
          </h2>
          <Button variant="ghost" className="text-sm text-[#FFA500] font-medium flex items-center">
            {t.viewMore}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="space-y-4">
          {restaurants.map((restaurant, i) => (
            <Card key={i} className="overflow-hidden shadow-custom hover-scale">
              <div className="relative h-48">
                <img src={restaurant.image} alt={restaurant.name[language]} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  {restaurant.rating}
                </div>
                {restaurant.popular && (
                  <div className="absolute top-3 left-3 bg-[#FFA500] px-3 py-1 rounded-full text-xs font-bold text-white">
                    {t.popular}
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold">{restaurant.name[language]}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {restaurant.area[language]}
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {restaurant.tags[language].map((tag, j) => (
                    <span key={j} className="text-xs bg-[#00CBB3]/10 text-[#00CBB3] px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white">
                  {t.book}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="section-divider mx-4" />

      {/* 特徴 */}
      <section className="px-4 space-y-4 mb-8">
        <h2 className="text-lg font-bold flex items-center mb-4">
          <span className="text-xl mr-2">✨</span>
          {t.services.title}
        </h2>
        <Card className="p-4 border-2 border-[#00CBB3] bg-white/50 hover-scale">
          <div className="flex items-center gap-4">
            <Phone className="h-10 w-10 text-[#00CBB3] p-2 bg-[#00CBB3]/10 rounded-full" />
            <div>
              <h3 className="font-bold mb-1">{t.services.phone.title}</h3>
              <p className="text-sm text-gray-600">{t.services.phone.desc}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-2 border-[#FFA500] bg-white/50 hover-scale">
          <div className="flex items-center gap-4">
            <Calendar className="h-10 w-10 text-[#FFA500] p-2 bg-[#FFA500]/10 rounded-full" />
            <div>
              <h3 className="font-bold mb-1">{t.services.easy.title}</h3>
              <p className="text-sm text-gray-600">{t.services.easy.desc}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-[#00CBB3] bg-white/50 hover-scale">
          <div className="flex items-center gap-4">
            <Clock className="h-10 w-10 text-[#00CBB3] p-2 bg-[#00CBB3]/10 rounded-full" />
            <div>
              <h3 className="font-bold mb-1">{t.services.quick.title}</h3>
              <p className="text-sm text-gray-600">{t.services.quick.desc}</p>
            </div>
          </div>
        </Card>
      </section>

      <div className="section-divider mx-4" />

      {/* お客様の声 */}
      <section className="px-4 mb-8">
        <h2 className="text-lg font-bold flex items-center mb-4">
          <span className="text-xl mr-2">💬</span>
          {t.testimonials.title}
        </h2>
        <div className="space-y-4">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="p-4 bg-white hover-scale">
              <div className="flex items-start gap-3 mb-3">
                <div className="bg-gradient-to-br from-[#00CBB3] to-[#FFA500] rounded-full w-10 h-10 flex items-center justify-center text-white font-bold">
                  {testimonial.name[language].charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{testimonial.name[language]}</p>
                  <p className="text-xs text-gray-500">{testimonial.location[language]}</p>
                </div>
              </div>
              <div className="flex mb-2">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-sm">{testimonial.text[language]}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 mb-8">
        <Card className="p-6 bg-gradient-to-br from-[#00CBB3] to-[#FFA500] text-white shadow-custom">
          <h2 className="text-xl font-bold mb-3">{t.cta.title}</h2>
          <p className="text-sm mb-4">{t.cta.desc}</p>
          <Button className="w-full bg-white text-[#00CBB3] hover:bg-white/90 font-bold py-3 rounded-xl hover-scale">
            {t.cta.button}
          </Button>
        </Card>
      </section>

      {/* フッター */}
      <footer className="bg-white pt-8 pb-20 px-4">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">🍽️</span>
          <h1 className="text-xl font-bold text-[#00CBB3]">{t.siteName}</h1>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          {t.footer.desc.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <div className="text-xs text-gray-400">
          {t.footer.rights}
        </div>
      </footer>
    </main>
  );
}