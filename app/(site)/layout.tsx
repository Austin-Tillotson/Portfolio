import Footer from "../components/Footer";
import Header from "../components/Header";
import SpaceScene from "../components/SpaceScene";

type SiteLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="site-shell">
      <Header />
      <SpaceScene />
      <main className="site-main">
        <div className="site-main__content">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
