"use client";

import { Bell, MapPin, Phone, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const categories = [
    { icon: "🍜", name: "人気店舗" },
    { icon: "📱", name: "予約方法" },
    { icon: "🗺️", name: "エリア" },
    { icon: "💬", name: "通訳" },
    { icon: "❓", name: "FAQ" },
  ];

  const restaurants = [
    {
      name: "明洞カルグクス",
      area: "明洞",
      rating: "4.8",
      image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=400",
      tags: ["韓国料理", "カルグクス"]
    },
    {
      name: "土俗村参鶏湯",
      area: "鐘路3街",
      rating: "4.9",
      image: "https://images.unsplash.com/photo-1580651315530-69c8e0026377?auto=format&fit=crop&w=400",
      tags: ["参鶏湯", "韓国料理"]
    }
  ];

  return (
    <main className="max-w-md mx-auto bg-[#F8F8F8] min-h-screen pb-20">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 z-50 shadow-custom">
        <h1 className="text-xl font-bold text-[#FFA500]">韓国グルメ予約</h1>
        <Bell className="h-6 w-6 text-gray-600" />
      </header>

      {/* Hero Banner */}
      <div className="p-6 bg-gradient-to-br from-[#FFA500] to-[#00CBB3] rounded-2xl mx-4 my-6 text-white shadow-custom">
        <h2 className="text-2xl font-bold mb-3">
          現地日本人から<br />
          人気の食堂を<br />
          簡単予約 🍽️
        </h2>
        <p className="text-sm opacity-90">電話予約のみの人気店も私たちにお任せください！</p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-5 gap-3 px-4 mb-8">
        {categories.map((category, i) => (
          <button key={i} className="text-center focus:outline-none">
            <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-custom hover:bg-[#00CBB3]/10 transition-colors">
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-xs">{category.name}</span>
          </button>
        ))}
      </div>

      {/* Popular Restaurants */}
      <section className="px-4 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">人気店舗</h2>
          <Button variant="ghost" className="text-sm text-[#00CBB3]">もっと見る &gt;</Button>
        </div>
        <div className="space-y-4">
          {restaurants.map((restaurant, i) => (
            <Card key={i} className="overflow-hidden shadow-custom">
              <div className="relative h-48">
                <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-bold">
                  ★ {restaurant.rating}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold">{restaurant.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {restaurant.area}
                  </div>
                </div>
                <div className="flex gap-2">
                  {restaurant.tags.map((tag, j) => (
                    <span key={j} className="text-xs bg-[#00CBB3]/10 text-[#00CBB3] px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features */}
      <div className="px-4 space-y-4">
        <Card className="p-4 border-2 border-[#FFA500] bg-white/50">
          <div className="flex items-center gap-4">
            <Phone className="h-8 w-8 text-[#FFA500]" />
            <div>
              <h3 className="font-bold mb-1">電話予約代行</h3>
              <p className="text-sm text-gray-600">日本語が通じない人気店も予約可能</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-2 border-[#00CBB3] bg-white/50">
          <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-[#00CBB3]" />
            <div>
              <h3 className="font-bold mb-1">簡単予約</h3>
              <p className="text-sm text-gray-600">24時間いつでも予約リクエスト可能</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 border-2 border-[#00CBB3] bg-white/50">
          <div className="flex items-center gap-4">
            <Clock className="h-8 w-8 text-[#00CBB3]" />
            <div>
              <h3 className="font-bold mb-1">迅速な対応</h3>
              <p className="text-sm text-gray-600">予約確定後すぐにご連絡いたします</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}