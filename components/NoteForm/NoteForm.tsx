"use client";

import css from "./NoteForm.module.css";
import { createNote } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/lib/store/noteStore";

export interface NoteFormProps {
  onCancel: () => void;
}

export default function NoteForm({ onCancel }: NoteFormProps) {
  const queryClient = useQueryClient();
  const { draft, setDraft, clearDraft } = useNoteStore();

  const { mutate } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      clearDraft();
      onCancel();
    },
  });

  const handleSubmit = (formData: FormData) => {
    const values = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as string,
    };
    mutate(values);
  };

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
    >
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          value={draft.title}
          onChange={(e) => setDraft({ title: e.target.value })}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={(e) => setDraft({ content: e.target.value })}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          value={draft.tag}
          onChange={(e) => setDraft({ tag: e.target.value })}
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
        >
          Create note
        </button>
      </div>
    </form>
  );
}