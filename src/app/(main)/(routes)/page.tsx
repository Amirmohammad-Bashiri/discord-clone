import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

function HomePage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <ModeToggle />
    </div>
  );
}

export default HomePage;
