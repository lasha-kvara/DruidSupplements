import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <p className="font-serif text-8xl font-semibold text-terracotta/30">404</p>
      <h1 className="mt-4 text-3xl font-semibold">გვერდი ვერ მოიძებნა</h1>
      <p className="mt-3 max-w-md text-charcoal-soft">
        როგორც ჩანს, ეს ბილიკი ტყეში დაიკარგა. დაბრუნდით მთავარ გვერდზე ან დაათვალიერეთ კატალოგი.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/catalog" className="btn-primary">
          კატალოგის ნახვა
        </Link>
        <Link href="/" className="btn-outline">
          მთავარი გვერდი
        </Link>
      </div>
    </div>
  );
}
