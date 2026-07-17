#!/bin/bash
# Downloads real post covers from @union_decor_ast (IG CDN urls expire; run once)
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
B="https://instagram.fala3-2.fna.fbcdn.net/v/t51.71878-15"
C="https://instagram.fala3-2.fna.fbcdn.net/v/t51.82787-15"
Q="_nc_ht=instagram.fala3-2.fna.fbcdn.net&_nc_oc=Q6cZ2gHhpMEMdnP4S5jtZESHEHtcPwZaF0pvbAjiGUoXwTwbMnjH2PYLzbvbPnnuscwTXUc&_nc_gid=zzgoUwdWzNCd_eYFq6NA0Q&edm=AOQ1c0wBAAAA&ccb=7-5&_nc_sid=8b3546"

get () { curl -sfL -A "$UA" -o "$2" "$1" && echo "ok  $2" || echo "FAIL $2"; }

get "$B/727715197_1510984600197133_7641691527496398946_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=101&_nc_ohc=BIl6cFRdv4IQ7kNvwEPE_lX&oh=00_AQD6vYmmVQVsqpBhQOSTZP36f-6uNsRfEk4XiiAk9PuBHg&oe=6A5FC937" premium-fargo.jpg
get "$B/619559692_868949442713332_7333457639402825503_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=104&_nc_ohc=eHROQkpyJFEQ7kNvwFdKQpO&oh=00_AQBhGFx9bWh1MqNv3u6to32w8kvGm8_Glq2A75ISOo9RkA&oe=6A5FD188" parket-elochka.jpg
get "$B/730397798_1709096820324893_1525987575046666527_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=105&_nc_ohc=GbO80BJ4nPsQ7kNvwEEWiKw&oh=00_AQBnwarVMtrpfBACwkVbPr7OCC5kYvyCJIYvAa0EAy08vg&oe=6A5FE385" spc-smartvinil.jpg
get "$B/731614619_1020186630555963_7514671528295759811_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=103&_nc_ohc=4mlQSSqVq-IQ7kNvwESgMfp&oh=00_AQBHAr9NImYCFETBaoxLQTKI1Xja2-56sf_YMNGEv_E8oQ&oe=6A5FB3E2" laminat-hoxen.jpg
get "$B/671826636_1715457072961500_1538552549199690465_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=100&_nc_ohc=Ew39AMUAMOAQ7kNvwFfyryi&oh=00_AQDoP8IZj6p0XfKCsNYt7LgI7kbd2cgC4j3wUU4igLLHJg&oe=6A5FC1AF" spc-aberhof.jpg
get "$B/682417655_990210376869137_300070663204644759_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=105&_nc_ohc=jg9WGiOYRigQ7kNvwG3Uu35&oh=00_AQDvG8mz9eJhbX1NiRtaiZQ3lUc3G-1ffZEB50jEx57HrA&oe=6A5FB20F" laminat-elochka.jpg
get "$C/681518787_18611190523048547_5518476464293513977_n.jpg?stp=dst-jpg_e35_p640x640_sh2.08_tt6&$Q&_nc_cat=111&_nc_ohc=b41mprz2AUcQ7kNvwGfenHF&oh=00_AQA52CT8XPGSETDHJ8bKKBSzf2h60f6L43IdeALSlDNDHQ&oe=6A5FB362" showroom-1.jpg
get "$B/669912642_1257495139887460_2053114585430558443_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=104&_nc_ohc=09qs7er9xjkQ7kNvwHf38kZ&oh=00_AQAixfuM_xtLo-EyIRHCc70G8y09Ql0im-8qN-l_HBISpw&oe=6A5FDAF9" assortiment-1.jpg
get "$B/656792741_1299724912020646_5485481809326882986_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=110&_nc_ohc=FFpZjMbsWZoQ7kNvwHWd5wC&oh=00_AQDy7nrAgPYAZBStdq4UlSwcsLtL1A_SCUzY8GurWB62Sw&oe=6A5FCAFE" assortiment-2.jpg
get "$B/649238584_2199825627499178_3790904922444701681_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=102&_nc_ohc=wWSItjuQihIQ7kNvwHLOHZ7&oh=00_AQBFK1GTDXLyVuO9RMvH25fWzS6x4ZNiv5-3ww5NOM1nyw&oe=6A5FE138" laminat-premium.jpg
get "$B/616426544_868533945883784_7607806611581455384_n.jpg?stp=dst-jpg_e15_tt6&$Q&_nc_cat=108&_nc_ohc=C_mJqzPHG34Q7kNvwFDnV9m&oh=00_AQAJdKiU5iUGnfg5nTOFtA09lJlG6CUFGI-DdYcmsj8vyA&oe=6A5FBF08" parket-inzhenernaya.jpg
get "$C/613036010_18193810270337166_2432255404935418806_n.jpg?stp=dst-jpg_e15_p640x640_tt6&$Q&_nc_cat=106&_nc_ohc=AASFsmv6jwQQ7kNvwE51MEu&oh=00_AQBDStvsQZdptH8C5JP37poqmzKTxOw35bfYsnGnwBlK9g&oe=6A5FC398" showroom-2.jpg
