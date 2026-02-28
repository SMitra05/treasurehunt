export const metadata = {
title: "TreasureHunt.Tectrix2026",
description: "College Fest Treasure Hunt Platform",
};

export default function RootLayout({
children,
}: {
children: React.ReactNode;
}) {
return (
<html lang="en">
<body>
{children}
</body>
</html>
);
}
