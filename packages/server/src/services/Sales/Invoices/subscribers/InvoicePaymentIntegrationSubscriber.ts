import { Service, Inject } from 'typedi';
import { omit } from 'lodash';
import events from '@/subscribers/events';
import {
  ISaleInvoiceCreatedPayload,
  PaymentIntegrationTransactionLink,
  PaymentIntegrationTransactionLinkEventPayload,
} from '@/interfaces';
import { EventPublisher } from '@/lib/EventPublisher/EventPublisher';

@Service()
export class InvoicePaymentIntegrationSubscriber {
  @Inject()
  private eventPublisher: EventPublisher;

  /**
   * Attaches events with handlers.
   */
  public attach = (bus) => {
    bus.subscribe(
      events.saleInvoice.onCreated,
      this.handleCreatePaymentIntegrationEvents
    );
    return bus;
  };

  /**
   * Handles the creation of payment integration events when a sale invoice is created.
   * This method filters enabled payment methods from the invoice and emits a payment
   * integration link event for each method.
   * @param {ISaleInvoiceCreatedPayload} payload - The payload containing sale invoice creation details.
   */
  private handleCreatePaymentIntegrationEvents = ({
    tenantId,
    saleInvoiceDTO,
    saleInvoice,
    trx,
  }: ISaleInvoiceCreatedPayload) => {
    const paymentMethods =
      saleInvoice.paymentMethods?.filter((method) => method.enable) || [];

    paymentMethods.map(
      async (paymentMethod: PaymentIntegrationTransactionLink) => {
        const payload = {
          ...omit(paymentMethod, ['id']),
          tenantId,
          saleInvoiceId: saleInvoice.id,
          trx,
        };
        await this.eventPublisher.emitAsync(
          events.paymentIntegrationLink.onPaymentIntegrationLink,
          payload as PaymentIntegrationTransactionLinkEventPayload
        );
      }
    );
  };
}
