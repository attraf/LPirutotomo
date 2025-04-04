"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, ChevronLeft, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

// 言語データの定義
const translations = {
  ko: {
    pageTitle: "식당 리스트",
    backToHome: "홈으로 돌아가기",
    popular: "인기",
    book: "예약하기",
    map: "지도 보기",
    filter: {
      all: "전체",
      osaka: "오사카",
      tokyo: "도쿄",
      kyoto: "교토"
    }
  },
  ja: {
    pageTitle: "食堂一覧",
    backToHome: "ホームに戻る",
    popular: "人気店",
    book: "予約する",
    map: "地図を見る",
    filter: {
      all: "すべて",
      osaka: "大阪",
      tokyo: "東京",
      kyoto: "京都"
    }
  }
};

// レストランデータ（実際の実装ではAPIから取得するかもしれません）
const restaurants = [
  {
    id: 1,
    name: {
      ko: "철판 만두 만두의 야마자키",
      ja: "鉄鍋餃子 餃子の山崎"
    },
    area: {
      ko: "오사카 북구",
      ja: "大阪北区"
    },
    rating: "4.4",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400",
    tags: {
      ko: ["이자카야", "만두"],
      ja: ["居酒屋", "餃子"]
    },
    popular: true,
    region: "osaka",
    url: "https://maps.app.goo.gl/dvibxgPN6LXzNQ7z5"
  },
  {
    id: 2,
    name: {
      ko: "니쿠시 지지이",
      ja: "肉師じじい"
    },
    area: {
      ko: "오사카 미나미",
      ja: "大阪ミナミ"
    },
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1535400255456-196757b8c124?auto=format&fit=crop&w=400",
    tags: {
      ko: ["야키니쿠", "이자카야"],
      ja: ["焼肉", "居酒屋"]
    },
    popular: true,
    region: "osaka",
    url: "https://maps.app.goo.gl/wBrkdaT5WAC2wYps7"
  },
  {
    id: 3,
    name: {
      ko: "탄화구이 나카오",
      ja: "炭火焼鳥 なかお"
    },
    area: {
      ko: "오사카 우메다",
      ja: "大阪梅田"
    },
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1591684080176-bb2b73f9ec68?auto=format&fit=crop&w=400",
    tags: {
      ko: ["야키토리"],
      ja: ["焼き鳥"]
    },
    popular: true,
    region: "osaka",
    url: "https://maps.app.goo.gl/1YigP3QfyNk8in7h6"
  },
  {
    id: 4,
    name: {
      ko: "탄화구이 코쿠레",
      ja: "炭火焼鳥 コクレ"
    },
    area: {
      ko: "오사카 우메다",
      ja: "大阪梅田"
    },
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400",
    tags: {
      ko: ["야키토리"],
      ja: ["焼き鳥"]
    },
    popular: false,
    region: "osaka",
    url: "https://maps.app.goo.gl/zJvNpcSRSruinKrq9"
  },
  {
    id: 5,
    name: {
      ko: "야키토리 야마토",
      ja: "焼鳥YAMATO"
    },
    area: {
      ko: "오사카 미나미",
      ja: "大阪ミナミ"
    },
    rating: "4.2",
    image: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=400",
    tags: {
      ko: ["야키토리"],
      ja: ["焼き鳥"]
    },
    popular: false,
    region: "osaka",
    url: "https://maps.app.goo.gl/vAERAyuobkg9Fbxw7"
  },
  {
    id: 6,
    name: {
      ko: "숙성육과 본격 탄화구이 마타사부로",
      ja: "熟成肉と本格炭火焼肉 又三郎"
    },
    area: {
      ko: "오사카 미나미",
      ja: "大阪ミナミ"
    },
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=400",
    tags: {
      ko: ["야키니쿠"],
      ja: ["焼肉"]
    },
    popular: true,
    region: "osaka",
    url: "https://maps.app.goo.gl/vAERAyuobkg9Fbxw7"
  },
  {
    id: 7,
    name: {
      ko: "마호로바 이로리 신사이바시",
      ja: "まほろば囲炉裏 心斎橋"
    },
    area: {
      ko: "오사카 신사이바시",
      ja: "大阪心斎橋"
    },
    rating: "4.4",
    image: "https://images.unsplash.com/photo-1575932444877-5106bee2a599?auto=format&fit=crop&w=400",
    tags: {
      ko: ["야키니쿠"],
      ja: ["焼肉"]
    },
    popular: false,
    region: "osaka",
    url: "https://maps.app.goo.gl/6MuifFBjr9b1Mva49"
  },
  {
    id: 8,
    name: {
      ko: "야키토리 교자 토리킨 우메다점",
      ja: "焼鳥 餃子 とり金 梅田店"
    },
    area: {
      ko: "오사카 우메다",
      ja: "大阪梅田"
    },
    rating: "4.3",
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400",
    tags: {
      ko: ["이자카야", "야키토리", "교자"],
      ja: ["居酒屋", "焼き鳥", "餃子"]
    },
    popular: true,
    region: "osaka",
    url: "https://maps.app.goo.gl/ADLEHRTV5s2xrYUu8"
  },
  {
    id: 9,
    name: {
      ko: "오뎅 사카바 유아미",
      ja: "おでん酒場 湯あみ"
    },
    area: {
      ko: "오사카 북구",
      ja: "大阪北区"
    },
    rating: "4.5",
    image: "https://images.unsplash.com/photo-1617196035154-421e3b3ab46e?auto=format&fit=crop&w=400",
    tags: {
      ko: ["오뎅", "이자카야"],
      ja: ["おでん", "居酒屋"]
    },
    popular: false,
    region: "osaka",
    url: "https://maps.app.goo.gl/E7CDrBGSbt19YY95A"
  },
  {
    id: 10,
    name: {
      ko: "호젠지요코초 야키젠",
      ja: "法善寺横丁 やき然"
    },
    area: {
      ko: "오사카 도톤보리",
      ja: "大阪道頓堀"
    },
    rating: "4.2",
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?auto=format&fit=crop&w=400",
    tags: {
      ko: ["오코노미야키"],
      ja: ["お好み焼き"]
    },
    popular: false,
    region: "osaka",
    url: "https://maps.app.goo.gl/Yqc4MGY4TK9hMKBi6"
  },
  {
    id: 11,
    name: {
      ko: "하나",
      ja: "花"
    },
    area: {
      ko: "오사카 미나미",
      ja: "大阪ミナミ"
    },
    rating: "4.4",
    image: "https://images.unsplash.com/photo-1565434275951-9e1839dd0e30?auto=format&fit=crop&w=400",
    tags: {
      ko: ["오코노미야키"],
      ja: ["お好み焼き"]
    },
    popular: false,
    region: "osaka",
    url: "https://maps.app.goo.gl/3jUrSLjiLhocmpYt5"
  },
  {
    id: 12,
    name: {
      ko: "오코노미야키 유카리 소네자키 본점",
      ja: "お好み焼 ゆかり 曽根崎本店"
    },
    area: {
      ko: "오사카 우메다",
      ja: "大阪梅田"
    },
    rating: "4.6",
    image: "https://images.unsplash.com/photo-1597395530603-6eae0a23ad59?auto=format&fit=crop&w=400",
    tags: {
      ko: ["오코노미야키"],
      ja: ["お好み焼き"]
    },
    popular: true,
    region: "osaka",
    url: "https://maps.app.goo.gl/mwNHcaNnviVLmdJbA"
  }
];

export default function RestaurantsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  
  // フィルタリングのためのステート
  const [filter, setFilter] = useState("all");
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);

  // フィルタが変更されたときにレストランをフィルタリング
  useEffect(() => {
    if (filter === "all") {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(restaurants.filter(r => r.region === filter));
    }
  }, [filter]);

  return (
    <main className="max-w-md mx-auto min-h-screen bg-gray-50 pb-20">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold flex-1">{t.pageTitle}</h1>
      </header>

      {/* フィルター */}
      <div className="p-4 bg-white shadow-sm mb-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className={filter === "all" ? "bg-[#00CBB3] hover:bg-[#00CBB3]/90" : ""}
            onClick={() => setFilter("all")}
          >
            {t.filter.all}
          </Button>
          <Button
            variant={filter === "osaka" ? "default" : "outline"}
            className={filter === "osaka" ? "bg-[#00CBB3] hover:bg-[#00CBB3]/90" : ""}
            onClick={() => setFilter("osaka")}
          >
            {t.filter.osaka}
          </Button>
          <Button
            variant={filter === "tokyo" ? "default" : "outline"}
            className={filter === "tokyo" ? "bg-[#00CBB3] hover:bg-[#00CBB3]/90" : ""}
            onClick={() => setFilter("tokyo")}
          >
            {t.filter.tokyo}
          </Button>
          <Button
            variant={filter === "kyoto" ? "default" : "outline"}
            className={filter === "kyoto" ? "bg-[#00CBB3] hover:bg-[#00CBB3]/90" : ""}
            onClick={() => setFilter("kyoto")}
          >
            {t.filter.kyoto}
          </Button>
        </div>
      </div>

      {/* レストランリスト */}
      <section className="px-4">
        <div className="space-y-4 mb-6">
          {filteredRestaurants.map((restaurant) => (
            <Card 
              key={restaurant.id} 
              className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden shadow-custom hover-scale"
            >
              <div className="relative h-48">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name[language]} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                  {restaurant.rating}
                </div>
                {restaurant.popular && (
                  <div className="absolute top-3 left-3 bg-[#FFA500] px-3 py-1 rounded-full text-xs text-white font-bold">
                    {t.popular}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{restaurant.name[language]}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <MapPin className="h-4 w-4 mr-1" />
                  {restaurant.area[language]}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {restaurant.tags[language].map((tag, i) => (
                    <span 
                      key={i} 
                      className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#FFA500] hover:bg-[#FFA500]/90">
                    {t.book}
                  </Button>
                  <a 
                    href={restaurant.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {t.map}
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
