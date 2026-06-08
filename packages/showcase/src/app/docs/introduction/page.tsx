import React from "react";

export default function IntroductionPage() {
  return (
    <>
      <h1>Formular.dev</h1>
      <p className="lead">
        An advanced, high-performance, schema-first form management and validation engine for modern TypeScript and JavaScript applications.
      </p>

      <p>
        This framework is framework-agnostic, type-safe, and optimized for complex enterprise-grade forms with zero runtime dependencies.
      </p>

      <h2>Key Features</h2>
      <ul>
        <li><strong>Framework Agnostic</strong>: Core business logic and validation run independently of UI frameworks. Works seamlessly with React, Vue, Svelte, Angular, or Vanilla JS.</li>
        <li><strong>Schema-First Design</strong>: Define forms using a declarative, fluent schema builder (similar to Zod) and automatically infer complete TypeScript types.</li>
        <li><strong>Performance-First Architecture</strong>: Features a channel-based event bus that isolates field updates, minimizing dirty checks and maximizing responsiveness (sub-100ms initialization for 100+ fields, ~30ms validation).</li>
        <li><strong>Inversion of Control (IoC)</strong>: Built on a robust Dependency Injection container (<code>ServiceManager</code>), allowing developers to swap or extend core services seamlessly.</li>
        <li><strong>Built-in Localization (i18n)</strong>: Ships with translation assets and localized validators for 6 languages: English, French, Spanish, German, Portuguese, and Italian.</li>
        <li><strong>Country-Specific Validation</strong>: Includes out-of-the-box validation rules for 12+ countries, including specialized format checks like Swiss AHV/social security and US SSN.</li>
      </ul>

      <h2>Installation</h2>
      <p>Install the package via your preferred package manager:</p>
      
      <pre>
        <code className="language-bash">
{`pnpm add formular.dev
# or
npm install formular.dev
# or
yarn add formular.dev`}
        </code>
      </pre>

      <h2>The "Zero Friction" Two-Step Pattern</h2>
      <p>Regardless of your framework or component library, integration follows a simple two-step process:</p>
      
      <ol>
        <li><strong>Schema Definition:</strong> Define your validation logic using our fluent, chainable API.</li>
        <li><strong>Form Wrapper Context:</strong> Pass the schema to the provider, and use inputs linked strictly by their <code>name</code>.</li>
      </ol>

      <p>Explore the integration paths on the left sidebar to see this in action.</p>
    </>
  );
}
