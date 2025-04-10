import { env } from "@/env";
import { URLBuilder } from "@/lib/helpers";
import { CResponse, handleError } from "@/lib/utils";
import {
    authCodeSchema,
    igUserSchema,
    type AuthExchangeResponse,
    type IGUser,
} from "@/lib/validations";
import axios from "axios";
import type { Request, Response } from "express";

class AuthController {
    redirect(_: Request, res: Response) {
        try {
            const scopes = [
                "instagram_business_basic",
                "instagram_business_manage_insights",
                "instagram_business_content_publish",
                "instagram_business_manage_comments",
                "instagram_business_manage_messages",
            ];

            const url = new URLBuilder(
                "https://www.instagram.com/oauth/authorize"
            )
                .addQueryParam("client_id", env.INSTAGRAM_CLIENT_ID)
                .addQueryParam("redirect_uri", env.INSTAGRAM_REDIRECT_URI)
                .addQueryParam("response_type", "code")
                .addQueryParam("scope", scopes.join(","))
                .build();

            res.redirect(url);
        } catch (err) {
            handleError(err, res);
        }
    }

    async callback(req: Request, res: Response) {
        try {
            const { code } = authCodeSchema.parse(req.query);

            const params = new URLSearchParams();
            params.append("client_id", env.INSTAGRAM_CLIENT_ID);
            params.append("client_secret", env.INSTAGRAM_CLIENT_SECRET);
            params.append("grant_type", "authorization_code");
            params.append("redirect_uri", env.INSTAGRAM_REDIRECT_URI);
            params.append("code", code);

            const url = new URLBuilder("https://api.instagram.com")
                .setPathTemplate("/oauth/access_token")
                .build();

            const response = await axios.post<AuthExchangeResponse>(
                url,
                params,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            res.cookie("ig_test_access_token", response.data.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                sameSite: "none",
                secure: true,
                domain: env.DOMAIN,
                path: "/",
            });
            res.cookie("ig_test_expires_in", Date.now() + 60 * 60 * 1000, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
                sameSite: "none",
                secure: true,
                domain: env.DOMAIN,
                path: "/",
            });

            CResponse({
                res,
                data: response.data,
            });
        } catch (err) {
            handleError(err, res);
        }
    }

    async me(req: Request, res: Response) {
        try {
            const { access_token } = req.ctx;

            const fields = Object.keys(igUserSchema.shape).join(",");

            const url = new URLBuilder("https://graph.instagram.com")
                .setPathTemplate("/v22.0/me")
                .addQueryParam("access_token", access_token)
                .addQueryParam("fields", fields)
                .build();

            const response = await axios.get<IGUser>(url, {
                headers: { "Content-Type": "application/json" },
            });

            CResponse({
                res,
                data: response.data,
            });
        } catch (err) {
            handleError(err, res);
        }
    }
}

export const authController = new AuthController();
