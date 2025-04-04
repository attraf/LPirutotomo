"use client";

import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRouter } from "next/navigation";

// 言語データの定義
const translations = {
  ko: {
    pageTitle: "요청 양식",
    backToHome: "홈으로 돌아가기",
    description: "게재된 식당 외에도 요청 가능합니다. 아래 양식을 작성해 주세요.",
    restaurantName: "예약하고 싶은 식당 이름",
    restaurantAddress: "식당 주소 또는 식당 전화번호",
    customerName: "예약자 이름",
    numberOfPeople: "예약 인원",
    email: "이메일 주소",
    notes: "추가 요청사항 (선택)",
    submit: "요청 제출하기",
    success: "예약 요청이 접수되었습니다! 예약 성공 이메일을 기다려주세요. 예약 불가 시 100% 환불됩니다👍",
    goToHome: "홈으로 돌아가기",
    required: "필수 항목입니다",
    invalidEmail: "유효한 이메일 주소를 입력해 주세요",
    placeholders: {
      restaurantName: "식당 이름을 입력하세요",
      restaurantAddress: "식당 주소 또는 전화번호를 입력하세요",
      customerName: "이름을 입력하세요",
      numberOfPeople: "인원 수를 입력하세요",
      email: "이메일 주소를 입력하세요",
      notes: "추가 요청사항이 있으면 입력하세요"
    }
  },
  ja: {
    pageTitle: "リクエストフォーム",
    backToHome: "ホームに戻る",
    description: "掲載店舗以外もリクエスト可能です。以下のフォームにご記入ください。",
    restaurantName: "予約したい食堂の名前",
    restaurantAddress: "食堂の住所または食堂の電話番号",
    customerName: "予約者名",
    numberOfPeople: "予約人数",
    email: "メールアドレス",
    notes: "追加リクエスト（任意）",
    submit: "リクエストを送信",
    success: "予約リクエストを受け付けました！予約成功メールをお待ちください。予約不可時も100%返金します👍",
    goToHome: "ホームに戻る",
    required: "必須項目です",
    invalidEmail: "有効なメールアドレスを入力してください",
    placeholders: {
      restaurantName: "食堂名を入力してください",
      restaurantAddress: "食堂の住所または電話番号を入力してください",
      customerName: "お名前を入力してください",
      numberOfPeople: "人数を入力してください",
      email: "メールアドレスを入力してください",
      notes: "追加リクエストがあれば入力してください"
    }
  }
};

// フォームデータの型定義
interface FormData {
  restaurantName: string;
  restaurantAddress: string;
  customerName: string;
  numberOfPeople: string;
  email: string;
  notes: string;
}

// エラーの型定義
interface FormErrors {
  restaurantName: string;
  restaurantAddress: string;
  customerName: string;
  numberOfPeople: string;
  email: string;
}

export default function RequestPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const t = translations[language];
  
  // フォームの状態管理
  const [formData, setFormData] = useState<FormData>({
    restaurantName: "",
    restaurantAddress: "",
    customerName: "",
    numberOfPeople: "",
    email: "",
    notes: ""
  });
  
  // エラー状態管理
  const [errors, setErrors] = useState<FormErrors>({
    restaurantName: "",
    restaurantAddress: "",
    customerName: "",
    numberOfPeople: "",
    email: ""
  });
  
  // 送信成功状態
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // 入力時にエラーをクリア
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };
  
  // バリデーション関数
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    
    // 必須フィールドのチェック
    (["restaurantName", "restaurantAddress", "customerName", "numberOfPeople", "email"] as const).forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = t.required;
        isValid = false;
      }
    });
    
    // メールアドレスの形式チェック
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = t.invalidEmail;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // 送信ハンドラ
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      // ここで実際にはAPIにデータを送信する処理を行う
      console.log("送信データ:", formData);
      
      // 送信成功状態にする
      setIsSubmitted(true);
      
      // フォームをリセット
      setFormData({
        restaurantName: "",
        restaurantAddress: "",
        customerName: "",
        numberOfPeople: "",
        email: "",
        notes: ""
      });
    }
  };

  // モーダルを閉じてホームに戻る
  const handleGoHome = () => {
    router.push('/');
  };
  
  return (
    <main className="max-w-md mx-auto bg-gray-50 min-h-screen pb-20">
      {/* ヘッダー */}
      <header className="sticky top-0 z-10 bg-white shadow-sm p-4 flex items-center">
        <Link href="/" className="mr-3">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-bold flex-1">{t.pageTitle}</h1>
      </header>
      
      <div className="p-4">
        <Card className="p-6 bg-white shadow-sm">
          <p className="text-sm text-gray-600 mb-6">{t.description}</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="restaurantName" className="text-sm font-medium">
                {t.restaurantName} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="restaurantName"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                placeholder={t.placeholders.restaurantName}
                className={errors.restaurantName ? "border-red-500" : ""}
              />
              {errors.restaurantName && (
                <p className="text-xs text-red-500">{errors.restaurantName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="restaurantAddress" className="text-sm font-medium">
                {t.restaurantAddress} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="restaurantAddress"
                name="restaurantAddress"
                value={formData.restaurantAddress}
                onChange={handleChange}
                placeholder={t.placeholders.restaurantAddress}
                className={errors.restaurantAddress ? "border-red-500" : ""}
              />
              {errors.restaurantAddress && (
                <p className="text-xs text-red-500">{errors.restaurantAddress}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerName" className="text-sm font-medium">
                {t.customerName} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                placeholder={t.placeholders.customerName}
                className={errors.customerName ? "border-red-500" : ""}
              />
              {errors.customerName && (
                <p className="text-xs text-red-500">{errors.customerName}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="numberOfPeople" className="text-sm font-medium">
                {t.numberOfPeople} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="numberOfPeople"
                name="numberOfPeople"
                type="number"
                min="1"
                value={formData.numberOfPeople}
                onChange={handleChange}
                placeholder={t.placeholders.numberOfPeople}
                className={errors.numberOfPeople ? "border-red-500" : ""}
              />
              {errors.numberOfPeople && (
                <p className="text-xs text-red-500">{errors.numberOfPeople}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                {t.email} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t.placeholders.email}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                {t.notes}
              </Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder={t.placeholders.notes}
                rows={3}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-[#FFA500] hover:bg-[#FFA500]/90 text-white font-bold py-3 rounded-xl hover-scale"
            >
              {t.submit}
            </Button>
          </form>
        </Card>
      </div>

      {/* 成功モーダル */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsSubmitted(false)} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold mb-4">Success!</h3>
              <p className="text-gray-600 mb-6">{t.success}</p>
              
              <Button 
                onClick={handleGoHome}
                className="w-full bg-[#00CBB3] hover:bg-[#00CBB3]/90 text-white font-bold py-3 rounded-xl hover-scale"
              >
                {t.goToHome}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
