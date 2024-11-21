import {
  BookOpen,
  Brain,
  CheckCircle,
  FileText,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" to="#">
          <Logo />
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#about"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#features"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            to="#contact"
          >
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Your Digital Second Brain
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl ">
                  Save, organize, and access your digital content effortlessly.
                </p>
              </div>
              <div className="">
                <Link to={"/sign-up"}>
                  <Button text="Get Started" type="default" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/20 flex items-center justify-center ">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full ">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Save Anything</h3>
                <p className="text-gray-500 ">
                  Articles, Google Docs, tweets, YouTube videos - save it all
                  with a single click.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full ">
                  <FileText className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Organize Effortlessly</h3>
                <p className="text-gray-500 ">
                  Auto-categorization and smart tagging keep your content neatly
                  organized.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="p-4 bg-white rounded-full ">
                  <Brain className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Access Anywhere</h3>
                <p className="text-gray-500 ">
                  Your second brain is always with you, on any device, online or
                  offline.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="solutions"
          className="w-full py-12 md:py-24 lg:py-32  flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              How Brainly <br /> Solves Your Problems
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-10 sm:mt-14 lg:mt-16">
              <div className="flex flex-col items-start space-y-3 bg-gray-200  px-6 py-5 rounded-md">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Information Overload</h3>
                <p className="text-gray-500 ">
                  Brainly helps you curate and organize content, cutting through
                  the noise and keeping only what's relevant to you.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 bg-gray-200 px-6 py-5 rounded-md">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">Lost Bookmarks</h3>
                <p className="text-gray-500 ">
                  Say goodbye to endless bookmark folders. Brainly provides a
                  structured, searchable repository for all your saved content.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-3 bg-gray-200 px-6 py-5 rounded-md">
                <CheckCircle className="h-8 w-8 text-primary" />
                <h3 className="text-xl font-bold">
                  Forgetting Key Information
                </h3>
                <p className="text-gray-500 ">
                  With Brainly's smart tagging and search features, you'll
                  always be able to find that crucial piece of information when
                  you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/20 flex items-center justify-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Organize Your Digital Life?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed ">
                Join thousands of users who have transformed their information
                management with MindVault.
              </p>
              <div className="">
                <Link to={"/sign-up"}>
                  <Button text="Get Started" type="default" />
                </Link>
              </div>
              {/* <Button className="bg-[hsl(262.1,83.3%,57.8%)] hover:bg-[hsl(262.1,83.3%,47.8%)] text-white">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button> */}
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 ">
          © 2024 Brainly. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" to="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
};

export default LandingPage;
