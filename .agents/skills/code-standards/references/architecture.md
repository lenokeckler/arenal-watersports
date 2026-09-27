# Architecture, SOLID, and Boundaries

## SOLID, stated as decisions you can act on

**Single Responsibility** — a module has one reason to change. Test: write its
purpose in one sentence with no "and". If you cannot, split it.

```
# bad: two reasons to change (format rules, transport rules)
class ReportMailer:
    def render_pdf(self, report): ...
    def send(self, pdf, address): ...

# good
class ReportRenderer:  def render(self, report) -> bytes: ...
class ReportMailer:    def send(self, document: bytes, address: str): ...
```

**Open/Closed** — adding a variant should mean adding a file, not editing a
`switch`. When a conditional grows a third branch on the same axis, replace it
with a lookup table or polymorphism.

```
# bad: every new exporter edits this function
if fmt == "csv":  ...
elif fmt == "json": ...
elif fmt == "xml":  ...

# good
EXPORTERS = {"csv": CsvExporter, "json": JsonExporter, "xml": XmlExporter}
exporter = EXPORTERS[fmt]()
```

**Liskov Substitution** — a subtype must not strengthen preconditions or weaken
postconditions. If an override throws `NotImplementedError`, the hierarchy is
wrong; the base interface is too wide.

**Interface Segregation** — callers should not depend on methods they never
call. Prefer three small interfaces over one with twelve methods. A consumer
that needs only `read()` must not be handed a `ReadWriteDeleteAdmin` port.

**Dependency Inversion** — high-level policy defines the interface; low-level
detail implements it.

```
# bad: service knows the concrete driver
class BillingService:
    def __init__(self):
        self.db = PostgresClient(DSN)     # unmockable, untestable, coupled

# good: service declares what it needs
class BillingService:
    def __init__(self, invoices: InvoiceRepository):
        self.invoices = invoices
```

## Layering

Three layers is enough for most projects:

```
domain/         pure logic, zero IO, zero framework imports
application/    orchestration, use cases, transactions
infrastructure/ db, http, filesystem, third-party SDKs
```

Dependency direction is one way: `infrastructure → application → domain`.
Domain code importing an HTTP client or ORM model is a defect, not a shortcut.

## Module boundaries

- A module exposes the smallest surface that satisfies its callers. Everything
  else stays private.
- Cross-module communication goes through that surface, never through reaching
  into internal files.
- Circular imports mean the boundary is drawn in the wrong place. Extract the
  shared concept into a third module rather than adding a lazy import.
- Shared utilities need a real domain name. A `utils/` folder that accumulates
  unrelated helpers is an absent boundary; `text/slugify.ts`, `time/window.ts`
  are boundaries.

## Coupling smells

| Smell                                                      | Fix                                                  |
| ---------------------------------------------------------- | ---------------------------------------------------- |
| Function reaches into a global or singleton                | Pass it as a parameter                               |
| Caller must set fields in a specific order                 | Constructor takes them together                      |
| Module imports another only for a type                     | Move the type to a shared contracts module           |
| Change in one file forces edits in three others            | Boundary is wrong; extract the shared concept        |
| Class has a `manager`, `helper`, `handler`, or `util` name | It has no responsibility; name it after what it does |

## Composition over inheritance

Inherit only for genuine substitutability. For sharing behaviour, compose:
pass a collaborator in, or take a function. Deep hierarchies make every change
ripple through levels no one reads.

## When splitting a file

Split along responsibility, not along line count. Cutting a 300-line file into
two 150-line halves at an arbitrary point produces two files that must change
together — that is worse than one honest file. Find the seam first: the group of
functions that share state or purpose becomes the new module.
