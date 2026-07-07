"use client";

import { useState, useEffect, useRef, useMemo, useCallback, useId } from "react";

// Precalculated yValues array of length 328 computed from the SVG path
const yValues = [128.271,127.460,126.648,127.606,122.260,122.238,119.410,117.944,119.709,116.932,120.617,126.884,113.816,106.469,105.823,124.185,124.586,108.992,104.850,105.430,105.496,97.441,94.156,98.551,91.841,90.220,69.680,69.680,84.295,85.706,80.661,68.148,66.358,72.001,62.964,54.579,57.822,71.196,66.129,67.930,67.073,61.028,68.403,60.020,57.832,57.075,64.991,60.315,60.230,63.212,52.306,51.963,54.586,60.903,52.324,48.046,49.452,62.424,56.411,57.011,57.217,57.055,46.432,46.456,52.071,58.037,62.161,40.113,42.769,38.270,38.270,48.975,47.754,48.898,50.458,40.900,31.884,43.552,55.423,44.911,44.909,27.116,24.988,28.251,37.571,39.813,32.982,34.948,28.297,33.089,41.699,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480,42.480];

const M = {
    label: "Reward",
    parameters: [
        { label: "max_steps", value: "10,000" },
        { label: "rollouts_per_example", value: "19" },
        { label: "seq_len", value: "4" },
        { label: "batch_size", value: "65536" },
        { label: "max_tokens", value: "256" },
        { label: "learning_rate", value: "0.00005" }
    ]
};

const n = "M0.0486374 128.232C0.611059 128.232 2.15694 126.463 2.22484 126.466C2.43558 126.475 2.66506 127.644 3.04205 127.668C3.2364 126.907 3.57358 122.479 3.77027 122.265C3.84286 122.186 5.10028 122.171 5.14945 122.235C5.26419 122.386 5.0394 124.5 5.62011 124.648V119.967C5.62011 118.36 6.35301 117.994 7.37159 117.399L8.19348 120.42C8.48383 119.308 8.6454 118.121 8.95683 117.019C9.04581 116.702 9.03879 116.122 9.36426 116.194C9.73423 119.562 10.2377 122.941 10.8113 126.261C10.8793 126.65 10.8629 127.665 11.2375 127.668L11.7339 115.771C12.4879 112.458 12.8579 109.058 13.1154 105.621L14.504 105.938L14.9723 124.174L16.1548 124.648L16.4475 111.28L18.0327 104.715L19.6671 105.923C20.002 105.3 18.9272 103.962 20.8426 104.416L21.0744 94.1438L22.47 94.1619L23.416 101.996C23.9194 98.9882 23.2614 94.7509 23.9358 91.9451C24.1255 91.1598 25.1792 90.7068 25.2845 89.7585L25.7575 69.6801H27.1648L27.6331 86.8953L28.1014 83.5761L29.5017 86.8953C30.6818 80.1542 30.9066 73.2561 31.1431 66.3579H32.5504V68.9251L33.014 72.0963C32.6558 69.3691 33.6369 66.8774 33.9296 64.3646C34.2902 61.2689 34.2855 57.7232 34.4213 54.5791H35.8286L36.8823 74.5125L37.2359 64.5488C38.0273 65.328 38.2029 66.7868 38.8047 67.7925C38.9522 68.0402 38.8047 68.3543 39.3339 68.164C39.2683 67.5207 39.8959 67.4845 40.0013 67.0707C40.2354 66.1525 40.3455 61.145 40.5117 60.9216C40.7318 60.8672 41.9166 61.133 41.9166 61.2266V69.0791L42.3826 65.3008C42.502 64.5428 42.2374 60.2027 42.3826 60.0185C42.4739 59.9007 43.7009 60.1363 43.7899 60.0215C43.8555 59.9339 43.6752 58.5205 43.9046 57.9044C44.1341 57.2882 45.422 56.8171 45.895 56.3973L46.1221 74.9836L46.5974 78.1398C46.3539 71.1661 47.0798 64.2528 47.0681 57.3003C49.5595 56.5664 48.5667 60.3477 48.7376 62.5494C48.7727 62.9964 48.8079 64.5367 49.4096 64.2468L49.8639 52.3532C49.9201 52.0875 51.2103 51.7854 51.2805 51.867C51.407 52.015 52.168 55.4822 52.3834 56.0349L53.1561 62.1357V55.0382C53.1561 54.7724 53.861 53.1234 53.9804 52.4771C54.2567 50.9911 54.4136 49.4508 54.5611 47.9377L55.9379 48.276C56.1252 50.0005 56.2774 61.9394 56.6849 62.4166C56.727 62.4679 57.57 62.48 57.6051 62.4377C57.776 62.2263 57.6894 56.8352 57.9423 56.3761C58.42 55.5154 59.6914 56.1768 59.483 57.3003C60.4431 57.095 60.3541 55.7359 61.3516 56.9983L61.8223 46.4276C62.1524 46.5061 63.0352 46.2796 63.2038 46.4608C63.3536 46.6239 63.8196 50.7676 63.8969 51.4562C64.2317 54.4311 63.8875 56.2644 65.1145 58.7198C65.3908 59.2725 65.4868 60.7403 65.6975 61.5196C65.7865 61.8548 65.9504 62.7397 66.2712 62.7367L66.5405 40.2785C66.7185 39.5808 67.4584 39.7922 67.9127 39.7832C68.0719 42.447 68.0625 45.1229 68.1468 47.7897C68.1585 48.1582 67.9689 48.9132 68.3786 48.8407L68.6128 38.27H70.0201L70.4884 49.7468C71.9331 49.9975 72.0057 49.2907 71.891 47.6296C73.5605 47.2642 73.5558 48.2427 73.9398 49.9733L74.6985 56.0862L75.1692 32.3776C75.223 31.4746 75.8716 31.5893 76.45 31.6165C77.0635 34.1142 76.7029 36.7629 76.7989 39.3362C76.9839 44.3859 77.1267 49.6622 77.5318 54.6999C77.5552 54.9899 77.6372 55.8355 77.9767 55.7812C78.2834 54.407 78.3888 45.3041 78.6838 44.9115C78.7635 44.8057 78.7635 44.8057 78.7635 44.8057L78.6838 44.9115C78.7635 44.8057 79.7937 44.9719 80.0888 44.9084L80.3182 47.3246L80.5454 30.8554C80.7912 30.0672 81.098 25.1926 81.2596 24.9811C81.3275 24.8905 82.3671 25.0023 82.6504 24.9932C83.3412 30.1064 84.4347 35.123 84.3012 40.3781C84.8632 40.4657 85.1325 40.3721 85.2355 39.6231C85.4135 38.3365 84.9686 33.782 85.3386 33.1115C85.5212 32.7793 86.4602 32.6887 86.6194 32.8608C86.7786 33.033 86.9168 35.0898 86.877 35.5458L87.3429 33.2807V28.2973H88.7502L89.2443 37.7747L90.1505 42.48";

export default function RewardCurveCard() {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const animRef = useRef(null);
    const timeoutRef = useRef(null);
    const isObserved = useRef(false);
    const idSuffix = useId().replace(/:/g, "");
    
    const clipIdIntro = `reward-intro-${idSuffix}`;
    const clipIdBefore = `reward-before-${idSuffix}`;
    const clipIdAfter = `reward-after-${idSuffix}`;

    const [hoveredX, setHoveredX] = useState(null);
    const [progress, setProgress] = useState(0);
    const [animFinished, setAnimFinished] = useState(false);
    const [showParams, setShowParams] = useState(false);

    const getRewardVal = useCallback((y) => Math.max(0, Math.min(1, 1 - y / 129)), []);

    const runAnimation = useCallback(() => {
        setAnimFinished(false);
        setShowParams(false);
        setProgress(0);
        
        if (animRef.current) window.cancelAnimationFrame(animRef.current);
        if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

        timeoutRef.current = window.setTimeout(() => {
            setShowParams(true);
        }, 500);

        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const t = Math.min(elapsed / 1600, 1);
            // Ease Out Quad
            setProgress(1 - (1 - t) * (1 - t));
            if (t < 1) {
                animRef.current = window.requestAnimationFrame(animate);
            } else {
                setAnimFinished(true);
            }
        };
        animRef.current = window.requestAnimationFrame(animate);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !isObserved.current) {
                isObserved.current = true;
                runAnimation();
            }
        }, { threshold: 0.3 });

        observer.observe(el);

        return () => {
            observer.disconnect();
            if (animRef.current) window.cancelAnimationFrame(animRef.current);
            if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
        };
    }, [runAnimation]);

    const handleMouseMove = useCallback((e) => {
        const svg = svgRef.current;
        if (!svg) return;
        const rect = svg.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 327;
        setHoveredX(x >= 0 && x <= 327 ? x : null);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setHoveredX(null);
    }, []);

    const R = 327 * progress;
    const initialReward = useMemo(() => getRewardVal(yValues[Math.round(Math.max(0, Math.min(327, R)))] ?? 129), [R, getRewardVal]);
    const currentReward = useMemo(() => {
        if (animFinished) {
            return hoveredX === null ? 0.92 : getRewardVal(yValues[Math.round(Math.max(0, Math.min(327, hoveredX)))] ?? 129);
        }
        return initialReward;
    }, [animFinished, initialReward, hoveredX, getRewardVal]);

    return (
        <div ref={containerRef} className="flex h-reward-curve-card-h w-reward-curve-shell-w select-none items-start gap-reward-curve-panel-gap bg-surface font-favorit-sans text-white/90">
            <div className="relative z-10 box-border flex h-full w-reward-curve-card-w shrink-0 flex-col gap-reward-curve-card-gap bg-surface px-reward-curve-card-x py-reward-curve-card-y">
                <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 z-20 h-full border-r border-dashed border-white-soft"></div>
                <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 z-10 h-full w-reward-curve-shadow-fade translate-x-full bg-linear-to-r from-surface to-transparent"></div>
                <div className="flex items-start justify-between whitespace-nowrap text-xs font-normal">
                    <span className="text-xs font-normal text-white">{M.label}</span>
                    <span className={`capitalize leading-14.057 tabular-nums ${currentReward >= 0.75 ? "text-available" : currentReward >= 0.4 ? "text-reward-curve-medium" : "text-reward-curve-low"}`}>
                        {currentReward.toFixed(2)}
                    </span>
                </div>
                <div className="relative h-reward-curve-chart-h shrink-0 pl-reward-curve-chart-pl">
                    <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-2 flex flex-col justify-between">
                        {[1, 0.8, 0.6, 0.4, 0.2, 0].map(val => (
                            <span key={val} className="font-favorit text-reward-axis leading-normal font-normal text-white/40 tabular-nums uppercase">
                                {val === 1 ? "1" : val === 0 ? "0" : val.toFixed(1)}
                            </span>
                        ))}
                    </div>
                    <svg ref={svgRef} viewBox="-4 -2 335 133" className="block h-full w-full cursor-crosshair" preserveAspectRatio="none" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <defs>
                            <clipPath id={clipIdIntro}>
                                <rect x="-4" y="-2" width={R + 4} height="135"></rect>
                            </clipPath>
                            {hoveredX !== null && animFinished && (
                                <>
                                    <clipPath id={clipIdBefore}>
                                        <rect x="-4" y="-2" width={hoveredX + 4} height="135"></rect>
                                    </clipPath>
                                    <clipPath id={clipIdAfter}>
                                        <rect x={hoveredX} y="-2" width={327 - hoveredX + 8} height="135"></rect>
                                    </clipPath>
                                </>
                            )}
                        </defs>
                        {[0.2, 0.4, 0.6, 0.8].map((val, idx) => {
                            const x = 327 * val;
                            return (
                                <path key={idx} d={`M ${x} 0 V 129 M ${x - 3} 64.5 H ${x + 3}`} fill="none" stroke="#1C1C1C" strokeWidth="0.5"></path>
                            );
                        })}
                        {animFinished ? (
                            hoveredX === null ? (
                                <path d={n} fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round"></path>
                            ) : (
                                <>
                                    <path d={n} fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" clipPath={`url(#${clipIdBefore})`}></path>
                                    <path d={n} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinejoin="round" clipPath={`url(#${clipIdAfter})`}></path>
                                    <line x1={hoveredX} x2={hoveredX} y1={0} y2={129} stroke="#FF0000" strokeWidth="0.5" opacity="0.7"></line>
                                </>
                            )
                        ) : (
                            <>
                                <path d={n} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" strokeLinejoin="round"></path>
                                <path d={n} fill="none" stroke="#FFFFFF" strokeWidth="1" strokeLinejoin="round" clipPath={`url(#${clipIdIntro})`}></path>
                            </>
                        )}
                    </svg>
                </div>
            </div>
            <div className="relative z-0 flex w-reward-params-w shrink-0 flex-col gap-1">
                {M.parameters.map(param => (
                    <div key={param.label} className={`reward-param-row flex h-reward-param-row-h shrink-0 items-center gap-reward-curve-card-gap text-xs leading-normal whitespace-nowrap ${showParams ? "reward-param-row-active" : ""}`}>
                        <span className="shrink-0 text-white/50">{param.label}</span>
                        <svg aria-hidden="true" viewBox="0 0 100 2" preserveAspectRatio="none" className="reward-param-divider block h-0.5 min-w-px flex-1 overflow-visible text-reward-divider">
                            <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="1.12484" strokeLinecap="round" strokeDasharray="0.11 3.37" vectorEffect="non-scaling-stroke"></line>
                        </svg>
                        <span className="reward-param-value shrink-0 text-white">{param.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
