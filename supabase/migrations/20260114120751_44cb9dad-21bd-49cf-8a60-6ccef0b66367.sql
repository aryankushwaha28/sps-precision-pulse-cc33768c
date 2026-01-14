-- Add explicit RLS policies for UPDATE and DELETE operations
-- Quote requests should be immutable - no updates or deletes allowed
-- This prevents accidental data modification even if future features are added

CREATE POLICY "Quote requests cannot be updated" 
ON public.quote_requests 
FOR UPDATE 
USING (false);

CREATE POLICY "Quote requests cannot be deleted" 
ON public.quote_requests 
FOR DELETE 
USING (false);