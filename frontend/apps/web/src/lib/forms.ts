import { FieldValues, Path, UseFormSetError } from 'react-hook-form'

/**
 * Helper function processing error messages from API server
 *
 * Example API response (4xx status code):
 *
 * {
 *   "first_name": [
 *     "first validation message",
 *     "second validation message"
 *   ]
 * }
 */
const fieldApiError = <TFieldValues extends FieldValues>(
  fieldName: string,
  fieldPath: Path<TFieldValues>,
  response: { [key: string]: string[] },
  setError: UseFormSetError<TFieldValues>
) => {
  if (typeof response !== 'boolean' && fieldName in response) {
    response[fieldName].forEach((error: string) => {
      setError(fieldPath, {
        message: error
      })
    })
  }
}

export { fieldApiError }
