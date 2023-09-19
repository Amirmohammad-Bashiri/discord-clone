import { UserButton } from "@clerk/nextjs";

function HomePage() {
  return (
    <div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}

export default HomePage;
