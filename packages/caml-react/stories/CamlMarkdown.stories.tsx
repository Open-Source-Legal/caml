import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CamlMarkdown } from "../src/CamlMarkdown";

const meta: Meta<typeof CamlMarkdown> = {
  title: "CamlMarkdown",
  component: CamlMarkdown,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    content: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CamlMarkdown>;

export const GFMDemo: Story = {
  args: {
    content: `# Contract Analysis Summary

## Key Metrics

| Metric | Value | Status |
|--------|-------|--------|
| Documents Reviewed | 1,247 | Complete |
| Compliance Rate | 94.2% | Above Target |
| Critical Findings | 12 | Action Required |
| Average Review Time | 3.2 days | On Track |

## Findings Priority

- [x] Force majeure clauses reviewed
- [x] Indemnification caps verified
- [ ] ~Arbitration clause update~ (superseded by mediation requirement)
- [ ] Cross-border transfer assessments pending

## Notable Observations

The analysis revealed that **67% of contracts** contained mutual indemnification provisions, while only **23%** included specific carve-outs for intellectual property infringement.

> Contracts in the healthcare sector showed the highest rate of regulatory compliance at 97.3%, likely due to existing HIPAA-driven contract management practices.

### Code Example

Configuration for the contract analysis pipeline:

\`\`\`json
{
  "pipeline": "contract-analysis",
  "version": "2.1",
  "jurisdictions": ["US", "EU", "UK"],
  "clauseTypes": [
    "force-majeure",
    "indemnification",
    "limitation-of-liability",
    "termination"
  ]
}
\`\`\`

Inline references use \`annotation_id\` format for cross-linking.

### Links

For more details, see the [full methodology](https://example.com/methodology) and the [regulatory tracker](https://example.com/tracker).`,
  },
};

export const SimpleProse: Story = {
  args: {
    content: `The reviewed agreements span multiple contract types including **master service agreements**, **data processing agreements**, **non-disclosure agreements**, and **software license agreements**.

Each contract was analyzed against a taxonomy of 47 clause types, with particular attention to provisions affected by recent regulatory changes in the EU and United States.`,
  },
};
