import type { Meta, StoryObj } from '@storybook/react-vite';
import { phToastClassNames, phToastIcons } from '../ui/toast';

/**
 * The kit ships the toast *look*, not the runtime: the app keeps rendering
 * sonner's `<Toaster>` and calling `toast()` from its own copy of sonner, and
 * spreads {@link liquidToasterProps} onto it. These stories render the glass
 * capsule statically from the exported `phToastClassNames` and `phToastIcons`
 * so the appearance can be reviewed without the sonner runtime.
 */
const meta = {
  title: 'UI/Toast',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          "A toast is a glass capsule with label-coloured text; the status lives in the icon's colour and its word, never in a coloured slab. Wire it up by spreading `phToasterProps` on sonner's <Toaster>.",
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

type Status = 'success' | 'error' | 'warning' | 'info';

const Capsule = ({
  status,
  title,
  description,
}: {
  status: Status;
  title: string;
  description?: string;
}) => (
  <div className={`${phToastClassNames.toast} ${phToastClassNames[status]}`}>
    <span className={phToastClassNames.icon}>{phToastIcons[status]}</span>
    <div className={phToastClassNames.content}>
      <div className={phToastClassNames.title}>{title}</div>
      {description && (
        <div className={phToastClassNames.description}>{description}</div>
      )}
    </div>
  </div>
);

export const Success: Story = {
  render: () => (
    <Capsule
      status="success"
      title="Saved"
      description="Your changes were saved."
    />
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex w-[380px] flex-col gap-3">
      <Capsule
        status="success"
        title="Booking confirmed"
        description="The client was notified."
      />
      <Capsule
        status="error"
        title="Payment failed"
        description="Card was declined."
      />
      <Capsule
        status="warning"
        title="Queue almost full"
        description="Only 2 slots left today."
      />
      <Capsule
        status="info"
        title="New update available"
        description="Reload to get the latest."
      />
    </div>
  ),
};
