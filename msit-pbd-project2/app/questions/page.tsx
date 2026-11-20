import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Dropdown from "@/components/Dropdown";

export default function Questions() {
  return (
    <main className="flex min-h-screen w-full flex-col bg-[rgb(215_203_169)]">
      <Header />
      <div className="flex-1">
        <div className="p-8">
          <h1 className="text-3xl font-semibold text-[#153f2e]">Questions</h1>
          <div className="mt-8">
            <Dropdown label="What is Kalagyo?">
              <p className="p-4 text-black">
                Kalagyo provides Davao-based tele-mental health services.
              </p>
            </Dropdown>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
