import Footer from "../components/Footer";
import Header from "../components/Header";
import SpaceScene from "../components/SpaceScene";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Header />
      <main className="site-main">
        <SpaceScene />
        <div className="site-main__content">{children}</div>
      </main>
      <Footer />
    </>
  );
}
