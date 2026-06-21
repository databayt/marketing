"use client";

import React from 'react';
import { useTranslations } from '@/lib/use-translations';

// Split "Head - detail" strings into a title + muted detail (mirrors the
// reference's title/detail list rows). Falls back to title-only when there is
// no separator so it stays safe across locales.
const splitHeadDetail = (value: string): { head: string; detail: string } => {
  const idx = value.indexOf(' - ');
  if (idx === -1) return { head: value, detail: '' };
  return { head: value.slice(0, idx), detail: value.slice(idx + 3) };
};

type Pair = { title: string; description: string };

const Item = ({ title, detail }: { title: string; detail?: string }) => (
  <li className="reveal about-item">
    <span className="about-item-title">{title}</span>
    {detail ? <span className="about-item-detail">{detail}</span> : null}
  </li>
);

export const Content = () => {
  const { t } = useTranslations();
  const a = t.marketing.about;

  const whatWeDo = [
    a.whatWeDo.development,
    a.whatWeDo.automation,
    a.whatWeDo.consulting,
    a.whatWeDo.openSource,
  ].map(splitHeadDetail);

  const businessModel: Pair[] = [
    a.businessModel.perProject,
    a.businessModel.partners,
    a.businessModel.codebase,
    a.businessModel.saas,
  ];

  const coreValues: Pair[] = [
    a.coreValues.transparency,
    a.coreValues.innovation,
    a.coreValues.growth,
    a.coreValues.excellence,
  ];

  return (
    <div className="about-content">
      <header className="about-intro">
        <p className="reveal about-lead">{a.introduction.paragraph1}</p>
        <p className="reveal about-lead">{a.introduction.paragraph2}</p>
        <p className="reveal about-lead">{a.introduction.paragraph3}</p>
        <p className="reveal about-lead">{a.introduction.paragraph4}</p>
      </header>

      <section className="about-section">
        <h2 className="reveal about-h2">{a.whatWeDo.title}</h2>
        <ul className="about-list">
          {whatWeDo.map((it, i) => (
            <Item key={i} title={it.head} detail={it.detail} />
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h2 className="reveal about-h2">{a.businessModel.title}</h2>
        <ul className="about-list">
          {businessModel.map((it, i) => (
            <Item key={i} title={it.title} detail={it.description} />
          ))}
        </ul>
      </section>

      <section className="about-section">
        <h2 className="reveal about-h2">{a.coreValues.title}</h2>
        <ul className="about-list">
          {coreValues.map((it, i) => (
            <Item key={i} title={it.title} detail={it.description} />
          ))}
        </ul>
      </section>
    </div>
  );
};
