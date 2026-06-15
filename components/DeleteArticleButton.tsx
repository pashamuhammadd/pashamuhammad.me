"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type DeleteArticleButtonProps = {
  articleId: string;
  articleTitle: string;
};

export default function DeleteArticleButton({
  articleId,
  articleTitle,
}: DeleteArticleButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${articleTitle}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);

    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("id", articleId);

    setIsDeleting(false);

    if (error) {
      alert(error.message);
      console.error("Delete error:", error);
      return;
    }

    alert("Article deleted successfully.");

    router.refresh();

    window.location.reload();
  }

  return (
    <button
      type="button"
      disabled={isDeleting}
      onClick={handleDelete}
      className="inline-flex items-center gap-2 rounded-full border border-red-400/30 px-5 py-2 text-sm text-red-400 transition hover:bg-red-400 hover:text-black disabled:opacity-50"
    >
      <Trash2 size={15} />
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}