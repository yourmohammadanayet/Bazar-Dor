import Link from "next/link";
import { Hind_Siliguri } from "next/font/google";
import SignUpForm from "@/components/auth/SignUpForm";

const authFont = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "সাইন আপ",
};

export default function SignUpPage() {
  return (
    <main
      className="signup-page mx-auto w-full max-w-md px-4 py-10"
      style={{ fontFamily: authFont.style.fontFamily }}
    >
      <style>{`
        .signup-page input {
          font-family: inherit;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          color: #1d271f;
        }

        .signup-page input::placeholder {
          color: #839087;
          font-weight: 400;
          opacity: 1;
        }

        .signup-page label {
          font-family: inherit;
          font-size: 14px;
          font-weight: 500;
          line-height: 21px;
        }

        .signup-page button {
          font-family: inherit;
          font-size: 14px;
          line-height: 21px;
        }

        .signup-page button[type="button"] {
          font-weight: 600;
          white-space: nowrap;
          padding-left: 8px;
          padding-right: 8px;
        }

        .signup-page button[type="submit"] {
          font-weight: 600;
        }

        @media (max-width: 399px) {
          .signup-page button[type="button"] {
            width: 100%;
          }
        }
      `}</style>

      <header className="mb-6 text-center">
        <h1 className="text-2xl font-bold leading-8">
          অ্যাকাউন্ট তৈরি করুন
        </h1>

        <p className="mt-1 text-sm font-normal leading-5 text-[#636f65]">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </header>

      <section
        aria-label="সাইন আপ"
        className="rounded-2xl border border-[#e1e8e1] bg-[#fafcfa] p-6"
      >
        <SignUpForm />
      </section>

      <Link
        href="/"
        className="mt-6 block text-center text-sm font-normal leading-5 text-[#7a857d] hover:text-[#05893e]"
      >
        ← হোম পেজে ফিরে যান
      </Link>
    </main>
  );
}