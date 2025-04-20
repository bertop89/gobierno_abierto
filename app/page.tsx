import ListVotaciones from "@/components/list-votaciones";

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col items-center justify-center">
        <ListVotaciones />
      </main>
    </>
  );
}
