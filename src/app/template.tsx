// A template re-mounts on every navigation, so each route gets the same short
// entrance: a blaze stripe sweeps the top edge and the page rises into place.
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="route-sweep" aria-hidden="true" />
      <div className="page-enter">{children}</div>
    </>
  );
}
