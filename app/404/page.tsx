import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gray-100 mx-auto flex flex-col items-center justify-center min-h-screen">
      <img className="mx-auto w-[900px]" src="/404.png" alt="404" />
      <Link href={"/"}>
        <button className="mt-4 mx-auto bg-green-500 hover:bg-green-800 text-white py-2 px-4 rounded">
          بازگشت به خانه
        </button>
      </Link>
    </div>
  );
}
