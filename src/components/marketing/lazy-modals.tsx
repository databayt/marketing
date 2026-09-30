"use client";

import { useEffect, useState, type ComponentType } from "react";
import dynamic from "next/dynamic";
import { afterLoadIdle } from "@/lib/idle";

// The form modals pull in react-hook-form, zod and Radix Dialog/Select, and they
// are closed on load. Rendering them through these wrappers keeps that code out of
// the landing page bundle: nothing mounts until the first open, and the chunk is
// prefetched once the browser is idle so that open is still instant.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function lazyModal(load: () => Promise<ComponentType<ModalProps>>) {
  const Modal = dynamic(load, { ssr: false });

  return function LazyModal(props: ModalProps) {
    const [requested, setRequested] = useState(props.isOpen);
    if (props.isOpen && !requested) setRequested(true);

    useEffect(() => afterLoadIdle(() => void load()), []);

    return requested ? <Modal {...props} /> : null;
  };
}

export const AppointmentModal = lazyModal(() =>
  import("./appointment-modal").then((m) => m.AppointmentModal)
);

export const ExpertModal = lazyModal(() =>
  import("./expert-modal").then((m) => m.ExpertModal)
);
