import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';

const ModelClient = dynamic(() => import('./ModelClient'), { ssr: false, loading: () => null });

export default function ModelWrapper() {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setVisible(true);
                obs.disconnect();
            }
        }, { rootMargin: '400px' });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return <div ref={ref} style={{ minHeight: 360 }}>{visible ? <ModelClient /> : null}</div>;
}
