import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Login() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <h1 className="p-8 text-3xl font-semibold text-[#153f2e]">Log In</h1>
      </div>
      <Footer />
    </main>
  );
}
