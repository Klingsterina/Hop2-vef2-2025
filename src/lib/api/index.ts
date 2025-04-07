const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://vef2-hopverk1-wyh0.onrender.com';

export interface ApiResponse<T>{
    data?: T;
    error?: string;
    status: number;
}

const getAuthHeaders = (): Record<string, string> => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
    return {};
  };

export async function fetchApi<T = unknown>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    try{
        const headers = {
            'Content-Type': 'application/json',
            ...getAuthHeaders(),
            ...options.headers,
        };

        const response = await fetch(url, {
            ...options,
            headers,
        });

        let data;
        const contentType = response.headers.get('content-type');
        if(contentType && contentType.includes('application/json')){
            const text = await response.text();
            data = text ? JSON.parse(text) : undefined;
        }

        if(!response.ok){
            console.log('Hér er loggað frá fetchApi skilgreiningunni því !response.ok')
            return {
                error: data?.message || `API villa: ${response.status}`,
                status: response.status
            };
        }
        console.log('Hér er loggað frá fetchApi definitioninu: ', response)
        return{
            data: data as T,
            status: response.status
        };
    } catch(error){
        console.error('API fetch villa!: ', error);
        return {
            error: error instanceof Error ? error.message : 'Óþekkt villa kom upp',
            status: 500
        };
    }
}

export async function uploadFile<T = unknown>(
    endpoint: string,
    file: File,
    fieldName: string = 'file'
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const formData = new FormData();
    formData.append(fieldName, file);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          ...getAuthHeaders(),
        },
      });
      
      const data = await response.json().catch(() => undefined);
      
      if (!response.ok) {
        return {
          error: data?.message || `Upload failed: ${response.status}`,
          status: response.status
        };
      }
      
      return {
        data: data as T,
        status: response.status
      };
    } catch (error) {
      console.error('File upload error:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 500
      };
    }
  }

export function setAuthToken(token: string): void {
    if (typeof window !== 'undefined'){
        localStorage.setItem('authToken', token);
    }
}

export function clearAuthToken(): void{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('authToken');
    }
}

export function isAuthenticated(): boolean{
    if (typeof window !== 'undefined'){
        return !!localStorage.getItem('authToken');
    }
    return false;
}

export { API_BASE_URL };
