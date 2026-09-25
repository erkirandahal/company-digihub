<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\JsonResponse;

abstract class Controller extends BaseController
{
    /**
     * Standardized success response for the Digihub Innovation Center API.
     */
    protected function successResponse($data = [], string $message = 'Request successful', int $statusCode = 200, array $meta = []): JsonResponse
    {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
        ];

        if (!empty($meta)) {
            $response['meta'] = $meta;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Standardized error response.
     */
    protected function errorResponse(string $message = 'An error occurred', int $statusCode = 400, $errors = []): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => $message,
            'errors' => $errors,
        ], $statusCode);
    }
}
