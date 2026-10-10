import Link from "next/link";
import { Hind_Siliguri } from "next/font/google";
import SignInForm from "@/components/auth/SignInForm";

const authFont = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "সাইন ইন",
};

export default function SignInPage() {
  return (
    <main
      className="signin-page mx-auto w-full max-w-md px-4 py-10"
      style={{ fontFamily: authFont.style.fontFamily }}
    >
      <style>{`
        .signin-page input {
          font-family: inherit;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: #1d271f;
        }

        .signin-page input::placeholder {
          color: #839087;
          opacity: 1;
        }

        .signin-page button {
          font-family: inherit;
          font-size: 14px;
          font-weight: 600;
          line-height: 21px;
        }
      `}</style>

      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold leading-8">সাইন ইন</h1>
        <p className="mt-1 text-sm leading-5 text-[#636f65]">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </header>

      <section
        aria-label="সাইন ইন"
        className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6"
      >
        <SignInForm />
      </section>

      <Link
        href="/"
        className="mt-6 block text-center text-sm leading-5 text-[#7a857d] hover:text-[#05893e]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}