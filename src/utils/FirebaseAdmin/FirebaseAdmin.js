const admin = require("firebase-admin");
const serviceAccount = require("./petshop-manager-firebase-adminsdk-y7nuh-f44983a9e3.json");

if (!admin.apps.length) {
    try {
      admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: "firebase-adminsdk-y7nuh@petshop-manager.iam.gserviceaccount.com",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNq7PNz6wn2K4S\nXhIcNS4/TfzHHfp07/LdS5Y0jJ4hvSniqCUOEhA3YXiZWiLZYY4eM6OVKLHxi6nl\naDnwfcAxDB95SLTMHxmp76VYNddaStsQx7atM3eDYGaIeZfRkF7x6XJluC6qXoPi\nBJLu58lGkrkBSnAt1Q8p9g0UIypvfNxm9MV7wnzmZf19qcVx5qlfo6vhIVxh2OAf\nCv7UcrM2M20hSQrIGSREuxAmdO00SuT8vhJ3T8AKQW4GVN1bY3DKUeQRCCwfhPVp\nOV4BfBmgIGH00bz5BJ9mS8ULxxVJAYj3GfSriOVufvDHfAN0z7jHunF/pmKLzWis\nww+YYd5fAgMBAAECggEAEWH4sWVi9H8wvyaqOy4XeYw62A1llKqPCTsRN+HGn61g\nM+LoNtc5/aREUBm5JkxDebP9mGa3G2YldtknRHcsXjjbFCIb/cCHJ8C0Zc8vI1d+\nSl3Gx7641Ca6o8A7H6AnFiUX4Rb/ArE4Tkr6rCx0630NG9nRv13piS9djZ0nQgLR\nsm+g+Z11/jDFzm212RZtJQIpXS2752P9yMew2scVr+oZG3H+2P0PFV0lA8IRGiZO\n6o8tIkYGgNJkerA4iw2Zn4blPYfPPSAGq5O0izATypA4h1NqGYOp5PkIBG/jY7I6\nzVXE1G97iNmNH3R07S9y0YWuwVbL911FCos+hxmfQQKBgQD1QhvPEZxdL/cmAJgZ\nsO27joB53aqcmofDa1f/rhfLZOETcab3IO7VsTf5tSLmTjPjQpJ7t+j6+hTgmp3X\nUvNr3Pog8chk3UJxRSojt7VJV9XIJf7FZ2juIEicQ9ZR308lxlXjGNbNDV6LWgsr\n7tSePy+jveLJZMCBGY3l9w4KfwKBgQDWrbq3l+438mNhQRnK3h+CklwSejFTh+k0\n4mdDQMtgxP3RLhR/knbLQIprNeFyb/wPC0cx7Q6klETlLzrTaXEkuBN2kNmaA8Lf\nTPHftNWar7nji8+epi+d1SbuqedAIKTqQkGKyu2gA1jIeMiXe20HuV8F0WgG3bEk\nxqKCrQN8IQKBgHU6JQqjk0ajb5F1hT36aJdWdKhLQIpb/np0q3olX3AzhrWBhFnp\nHt97NpMfdk/4nyqIHnYOIMkdka8NmFZcasdqtw/aIXu8mk6DzbGG1Jr65c8mAhGe\n7POs8KfocN9vSmh21YSX0cvvEPqwjlhwbqY4829jiqvSgYTzjvSVUtvHAoGBAJWN\nK1Dwt1QkOFUs++HWgY79lMSOeURenvhnbFZukf/U25jYiBEjIDyRtpvfSjHlj2uP\niMZgBV5jp+cc0tcqUlapIW3slJp1WlEjEjCskk2Tc2TwJe+4h91k+x0yIVYMJ7bF\n91DP82AQVM47TkoxApBp86di7RwzXk9nTRjJnG7hAoGAUyahFFDwp6V36VKx0sg4\n9gesnEbQjRFIluJK58oIxsvsDoVn3Lp/YTPARLiO4fqzIhdk7xP2syEY4Gg7X6fN\nbmQrZUoUjN88XLLuUVusk4l26/XY+0DCCJ1iEdo2ELETMBKQ8pMP7izqbekabely\nNtYB1vf3p6tJj3G3lIj26i4=\n-----END PRIVATE KEY-----\n",
          projectId: "petshop-manager",

        })

      });
    } catch (error) {
      console.log('Firebase admin initialization error', error.stack);
    }
}

export default admin;