"use client";
import { useTranslations } from "next-intl";

export default function Unauthenticated() {
  const t = useTranslations("notFound");

  return <h1> {t("title")}</h1>;
}
