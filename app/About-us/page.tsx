
import Image from "next/image";

export default function AboutAs() {
  return (
    <div>
      <Image src="/about.png" alt="about" className="mx-auto h-[500px]" />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-xl font-bold mb-2">بیش از ۲۶ شعبه فعال</h2>
            <p className="text-brown-500">
              در حال حاضر با ۲۶ شعبه فعال به همراه ۱۵ شعبه اسنپ فود و بیش از ۴۰۰
              باریستا در خانواده‌مان در پر ترددترین نقاط شهر تهران و جاده‌های
              کشور با افتخار در خدمت عموم مردم ایران هستیم.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">دریافت جایزه مشتری مداری</h2>
            <p className="text-brown-500">
              قهوه دریا مفتخر است اعلام کند در بین ۱۰۰ برند برتر، جایزه ویژه
              خدمات بهینه و تکریم از مشتری را در سال ۱۴۰۱ از طرف صنعت کارگزاری
              رسمی کشورمان دریافت نمودیم.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-2">رضایت مشتری</h2>
            <p className="text-brown-500">
              در طول سالیان متمادی خدمت رسانی به مردم عزیز کشورمان، تا به امروز
              بیش از ۹۹٪ رضایت مشتری را در سیستم‌های اطلاعاتی ثبت نمودیم.
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row   p-6 rounded-lg shadow-lg">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-center text-xl font-bold mb-4">تماس با ما</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                نام و نام خانوادگی <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="نام و نام خانوادگی"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                آدرس ایمیل <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="آدرس ایمیل"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                شماره تماس <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="شماره تماس"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                پیام شما <span className="text-red-500">*</span>
              </label>
              <textarea
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                placeholder="پیام شما"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <div className="g-recaptcha" data-sitekey="your_site_key"></div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 text-white py-2 px-4 rounded-md"
              >
                ارسال فرم تماس با ما
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col items-center">
          <Image
            src="/MUG-ORANGE-SLOGAN-LAMIZ.webp"
            alt="A coffee cup with the text 'YOU'RE GOING TO FEEL BETTER SOON'"
            className="mb-4"
          />
          <p className="text-center  font-semibold mb-4">
            ما همیشه مشتاق شنیدن نظرات و پیشنهادات شما در راستای ارائه بهترین
            سرویس و خدمات هستیم
          </p>
          <p className="text-center text-sm mb-4">
            برای ارسال پیشنهادات و نظراتتان لطفا فرم را تکمیل کنید تا کارشناسان
            ما بعد از بررسی با شما ارتباط بگیرند
          </p>
          <button className="bg-orange-500 text-white py-2 px-4 rounded-md">
            انتقادات و پیشنهادات
          </button>
        </div>
      </div>
    </div>
  );
}
