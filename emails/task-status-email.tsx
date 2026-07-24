import { Button, Section, Text } from "@react-email/components";
import {
  EmailLayout,
  button,
  heading,
  label,
  paragraph,
  value,
} from "./components/layout";

export function TaskStatusEmail({
  creatorName,
  updaterName,
  taskTitle,
  status,
  taskUrl,
}: {
  creatorName: string;
  updaterName: string;
  taskTitle: string;
  status: string;
  taskUrl: string;
}) {
  return (
    <EmailLayout previewText={`Task updated: ${taskTitle}`}>
      <Text style={heading}>Task status updated</Text>
      <Text style={paragraph}>
        Hi {creatorName}, {updaterName} updated a task you created.
      </Text>

      <Section>
        <Text style={label}>Task</Text>
        <Text style={value}>{taskTitle}</Text>

        <Text style={label}>New status</Text>
        <Text style={value}>{status}</Text>
      </Section>

      <Button href={taskUrl} style={button}>
        View task
      </Button>
    </EmailLayout>
  );
}

export default TaskStatusEmail;
