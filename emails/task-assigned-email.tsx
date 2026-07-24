import { Button, Section, Text } from "@react-email/components";
import {
  EmailLayout,
  button,
  heading,
  label,
  paragraph,
  value,
} from "./components/layout";

export function TaskAssignedEmail({
  assigneeName,
  assignerName,
  taskTitle,
  priority,
  dueDate,
  taskUrl,
}: {
  assigneeName: string;
  assignerName: string;
  taskTitle: string;
  priority: string;
  dueDate: string | null;
  taskUrl: string;
}) {
  return (
    <EmailLayout previewText={`New task assigned: ${taskTitle}`}>
      <Text style={heading}>New task assigned</Text>
      <Text style={paragraph}>
        Hi {assigneeName}, {assignerName} assigned you a new task.
      </Text>

      <Section>
        <Text style={label}>Task</Text>
        <Text style={value}>{taskTitle}</Text>

        <Text style={label}>Priority</Text>
        <Text style={value}>{priority}</Text>

        <Text style={label}>Due date</Text>
        <Text style={value}>{dueDate ?? "No due date"}</Text>
      </Section>

      <Button href={taskUrl} style={button}>
        View task
      </Button>
    </EmailLayout>
  );
}

export default TaskAssignedEmail;
