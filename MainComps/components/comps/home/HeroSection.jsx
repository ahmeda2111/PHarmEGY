import Link from "next/link";
import MainText from "../MainTextComponent";
import MainButton from "../MainButton";

export default function HeroSection() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <MainText
              as="span"
              className="inline-flex rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700"
            >
              PHarmEGY
            </MainText>

            <MainText
              as="h1"
              className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              Discover trusted
              <MainText as="span" className="block text-blue-600">
                pharmaceutical products
              </MainText>
            </MainText>

            <MainText as="p" className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Discover pharmaceutical products and explore trusted
              pharmaceutical companies in one modern platform.
            </MainText>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/view-list?entity=products">
                <MainButton>
                  <MainText>Explore our products</MainText>
                </MainButton>
              </Link>

              <Link href="/about">
                <MainButton variant="outline">
                  <MainText>About Us</MainText>
                </MainButton>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex h-80 w-full max-w-lg items-center justify-center rounded-3xl bg-blue-100">
              <div className="text-center">
                <img
                  src="/assets/01_Full_Logo/PHarmEGY_Full_Transparent_512px.png"
                  alt="PHarmEGY"
                  className="mx-auto h-40 w-auto"
                />

                <MainText as="p" className="mt-4 text-sm text-slate-500">
                  Pharmaceutical Products Platform
                </MainText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
