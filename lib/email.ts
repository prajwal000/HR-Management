import "server-only";
import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/welcome-email";
import { TaskAssignedEmail } from "@/emails/task-assigned-email";
import { TaskStatusEmail } from "@/emails/task-status-email";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "onboarding@yourdomain.com";
const APP_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";

function logEmailFailure(context: string, error: unknown) {
  console.error(`[email] Failed to send ${context}:`, error);
}

export async function sendWelcomeEmail({
  name,
  email,
  temporaryPassword,
}: {
  name: string;
  email: string;
  temporaryPassword: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Your HR Manager account has been created",
      react: WelcomeEmail({
        name,
        email,
        temporaryPassword,
        loginUrl: APP_URL,
      }),
    });
  } catch (error) {
    logEmailFailure("welcome email", error);
  }
}

export async function sendTaskAssignedEmail({
  assigneeEmail,
  assigneeName,
  assignerName,
  taskId,
  taskTitle,
  priority,
  dueDate,
}: {
  assigneeEmail: string;
  assigneeName: string;
  assignerName: string;
  taskId: string;
  taskTitle: string;
  priority: string;
  dueDate: Date | null;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: assigneeEmail,
      subject: `New Task Assigned — ${taskTitle}`,
      react: TaskAssignedEmail({
        assigneeName,
        assignerName,
        taskTitle,
        priority,
        dueDate: dueDate ? dueDate.toLocaleDateString() : null,
        taskUrl: `${APP_URL}/tasks/${taskId}`,
      }),
    });
  } catch (error) {
    logEmailFailure("task-assigned email", error);
  }
}

export async function sendTaskStatusEmail({
  creatorEmail,
  creatorName,
  updaterName,
  taskId,
  taskTitle,
  status,
}: {
  creatorEmail: string;
  creatorName: string;
  updaterName: string;
  taskId: string;
  taskTitle: string;
  status: string;
}) {
  try {
    await resend.emails.send({
      from: FROM,
      to: creatorEmail,
      subject: `Task Updated — ${taskTitle}`,
      react: TaskStatusEmail({
        creatorName,
        updaterName,
        taskTitle,
        status,
        taskUrl: `${APP_URL}/tasks/${taskId}`,
      }),
    });
  } catch (error) {
    logEmailFailure("task-status email", error);
  }
}
