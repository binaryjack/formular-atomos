---
name: formular-atomos
description: React form components bridging Atomos UI and Formular.dev validation
---
<?xml version="1.0" encoding="UTF-8"?>
<codernic_skill id="formular-atomos" kind="library" package="@formular/atomos" version="0.1.1" ast_hash="blake3:f25dea818cf1b758c320433a29081f1aa37d5165708137dfaf86dfd250b280b8">
  <mental_model>
    @formular/atomos is a sovereign Codernic infrastructure library component.
    It enforces complete implementations, Pirsig AST invariants, and strict boundary discipline.
    All consumers interact via deterministic SDK APIs or typed CLI wire envelopes.
  </mental_model>

  <sdk_surface>
    <typescript>
      <module name="@atomos/ui">
        <export symbol="FormField" kind="interface" description="TypeScript interface export" />
        <export symbol="FormContextValue" kind="interface" description="TypeScript interface export" />
        <export symbol="useFormContext" kind="hook" description="TypeScript hook export" />
        <export symbol="FormProviderProps" kind="interface" description="TypeScript interface export" />
        <export symbol="FormProvider" kind="const" description="TypeScript const export" />
        <export symbol="FormInput" kind="const" description="TypeScript const export" />
        <export symbol="FormTextarea" kind="const" description="TypeScript const export" />
        <export symbol="FormCheckbox" kind="const" description="TypeScript const export" />
        <export symbol="FormSelect" kind="const" description="TypeScript const export" />
        <export symbol="FormFileUpload" kind="const" description="TypeScript const export" />
        <export symbol="DatePicker" kind="const" description="TypeScript const export" />
        <export symbol="TimePicker" kind="const" description="TypeScript const export" />
        <export symbol="Toggle" kind="const" description="TypeScript const export" />
        <export symbol="FieldSet" kind="const" description="TypeScript const export" />
        <export symbol="Label" kind="const" description="TypeScript const export" />
        <export symbol="ErrorMessage" kind="const" description="TypeScript const export" />
        <export symbol="HelpText" kind="const" description="TypeScript const export" />
        <export symbol="ButtonProps" kind="interface" description="TypeScript interface export" />
        <export symbol="Button" kind="const" description="TypeScript const export" />
      </module>
      <module name="@binaryjack/synetics">
        <export symbol="FormularContextValue" kind="interface" description="TypeScript interface export" />
        <export symbol="FormProvider" kind="component" description="TypeScript component export" />
        <export symbol="useFormularField" kind="hook" description="TypeScript hook export" />
        <export symbol="Input" kind="component" description="TypeScript component export" />
        <export symbol="Button" kind="component" description="TypeScript component export" />
      </module>
    </typescript>
  </sdk_surface>

  <invariants>
    <invariant id="INV-001">Strict wire envelope: all CLI --json commands output SdkEnvelope&lt;T&gt; with namespace '@codernic/atomos'.</invariant>
    <invariant id="INV-002">Pirsig complexity: max 200 lines per file, max 40 lines per function, zero warnings under cargo clippy -D warnings.</invariant>
    <invariant id="INV-003">Zero vaporware: absolute production readiness and strictly verified functionality in production surfaces.</invariant>
  </invariants>

  <anti_patterns>
    <anti_pattern id="AP-001">Blocking indefinitely on locks during hook or IO operations.</anti_pattern>
    <anti_pattern id="AP-002">Direct std::env::var calls inside library logic: use GCM configuration.</anti_pattern>
    <anti_pattern id="AP-003">Unstructured CLI outputs: always supply --json with typed SdkEnvelope wire contract.</anti_pattern>
    <anti_pattern id="AP-004">Manual struct instantiation bypassing builder or validation invariants.</anti_pattern>
  </anti_patterns>

  <verification>
    <step name="build">pnpm build</step>
    <step name="test">pnpm test -- --run</step>
    <step name="skill-verify">coc-pm skill verify skill/SKILL.md --json</step>
  </verification>
</codernic_skill>
